import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get or create a default profile
export async function getOrCreateDefaultProfile() {
  try {
    // First, try to get the first available profile
    const response = await fetch('/api/profiles?page=1&limit=1')
    if (response.ok) {
      const data = await response.json()
      if (data.profiles && data.profiles.length > 0) {
        return data.profiles[0].id
      }
    }
    
    // If no profiles exist, try to create a default one
    // Use a timestamp to ensure unique email
    const timestamp = Date.now()
    const createResponse = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Default Profile',
        email: `user${timestamp}@example.com`
      })
    })
    
    if (createResponse.ok) {
      const newProfile = await createResponse.json()
      return newProfile.id
    }
    
    throw new Error('Failed to create default profile')
  } catch (error) {
    console.error('Error getting or creating default profile:', error)
    throw error
  }
}
