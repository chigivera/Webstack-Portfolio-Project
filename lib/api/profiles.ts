import type { Profile } from '../types';

export async function getProfiles() {
  const response = await fetch('/api/profiles');
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
}

export async function getProfile(id: number) {
  const response = await fetch(`/api/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
}

export async function createProfile(data: Partial<Profile>) {
  const response = await fetch('/api/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create profile');
  }
  return response.json();
}

export async function updateProfile(id: number, data: Partial<Profile>) {
  const response = await fetch(`/api/profiles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
}

export async function deleteProfile(id: number) {
  const response = await fetch(`/api/profiles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete profile');
  }
  return response.json();
} 