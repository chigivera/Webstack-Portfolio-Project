import type { University } from '../types';

export async function getUniversities(page = 1, limit = 10, search = '') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) {
    params.append('search', search);
  }
  
  const response = await fetch(`/api/universities?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch universities');
  }
  return response.json();
}

export async function getUniversity(id: number) {
  const response = await fetch(`/api/universities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch university');
  }
  return response.json();
}

export async function createUniversity(data: Partial<University>) {
  const response = await fetch('/api/universities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create university');
  }
  return response.json();
}

export async function updateUniversity(id: number, data: Partial<University>) {
  const response = await fetch(`/api/universities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update university');
  }
  return response.json();
}

export async function deleteUniversity(id: number) {
  const response = await fetch(`/api/universities/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete university');
  }
  return response.json();
} 