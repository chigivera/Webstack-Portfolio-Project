import { PrismaClient } from '../lib/generated/client';
import * as XLSX from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();

function parseRateToFloat(rate: string | number | null | undefined): number | null {
    if (rate === null || rate === undefined) {
        return null;
    }
    if (typeof rate === 'number') {
        return rate;
    }
    if (typeof rate === 'string') {
        const parsed = parseFloat(rate.replace('%', '').trim());
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    return null;
}

interface UniversityData {
    name: string;
    location: string;
    acceptanceRate: number | null;
    applicationLink: string;
    scholarships: { name: string; acceptanceRate: number | null }[];
    programFocuses: string[];
}

async function main() {
  const filePath = path.join(__dirname, '../universities.xlsx');
  const workbook = XLSX.readFile(filePath);
  const universitiesMap = new Map<string, UniversityData>();

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0] as string[];
    
    const h = (name: string) => headers.findIndex((h: string) => h && h.toLowerCase().trim() === name.toLowerCase().trim());

    const nameIdx = h('University Name');
    const locationIdx = h('Location');
    const acceptanceRateIdx = h('Acceptance Rate');
    const scholarshipNameIdx = h('Scholarship Acceptance Name');
    const scholarshipRateIdx = h('Scholarship Acceptance Rate');
    const programFocusIdx = h('Program Focus');
    const appLinkIdx = h('Application Link');

    if (nameIdx === -1) {
        console.warn(`Sheet "${sheetName}" does not have a "University Name" column, skipping.`);
        continue;
    }

    for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        const universityName = row[nameIdx];
        if (!universityName) continue;
  
        let uniData = universitiesMap.get(universityName);
        if (!uniData) {
          uniData = {
              name: universityName,
              location: row[locationIdx] || '',
              acceptanceRate: parseRateToFloat(row[acceptanceRateIdx]),
              applicationLink: row[appLinkIdx] || '',
              scholarships: [],
              programFocuses: [],
          };
          universitiesMap.set(universityName, uniData);
        }
        
        const scholarshipName = row[scholarshipNameIdx];
        if (scholarshipName) {
          uniData.scholarships.push({
              name: scholarshipName,
              acceptanceRate: parseRateToFloat(row[scholarshipRateIdx]),
          });
        }
  
        const programFocusName = row[programFocusIdx];
        if (programFocusName) {
          const focuses = String(programFocusName).split(',').map((s:string) => s.trim()).filter(Boolean);
          uniData.programFocuses.push(...focuses);
        }
    }
  }

  // Now, seed the database
  await prisma.scholarship.deleteMany({});
  await prisma.programFocus.deleteMany({});
  await prisma.university.deleteMany({});

  for (const uniData of universitiesMap.values()) {
    // Calculate priority
    let priority = 0;
    if (uniData.acceptanceRate) {
        priority += uniData.acceptanceRate;
    }
    if (uniData.scholarships.length > 0) {
        const validScholarships = uniData.scholarships.filter(s => s.acceptanceRate !== null);
        if (validScholarships.length > 0) {
            const avgScholarshipRate = validScholarships
                .map(s => s.acceptanceRate!)
                .reduce((a, b) => a + b, 0) / validScholarships.length;
            priority += avgScholarshipRate;
        }
    }

    const university = await prisma.university.create({
        data: {
            name: uniData.name,
            location: uniData.location,
            acceptanceRate: uniData.acceptanceRate,
            applicationLink: uniData.applicationLink,
            priority: Math.round(priority),
            scholarships: {
                create: uniData.scholarships,
            },
            programFocus: {
                create: [...new Set(uniData.programFocuses)].map(name => ({ name })),
            }
        }
    });
    console.log(`Created university: ${university.name} with priority ${university.priority}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 