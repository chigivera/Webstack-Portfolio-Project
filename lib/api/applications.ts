import type { Application } from '../types';

export async function getApplications(page = 1, limit = 10) {
  const response = await fetch(`/api/applications?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  return response.json();
}

export async function getApplication(id: number) {
  const response = await fetch(`/api/applications/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch application');
  }
  return response.json();
}

export async function createApplication(data: Partial<Application>) {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create application');
  }
  return response.json();
}

export async function updateApplication(id: number, data: Partial<Application>) {
  const response = await fetch(`/api/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update application');
  }
  return response.json();
}

export async function deleteApplication(id: number) {
  const response = await fetch(`/api/applications/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete application');
  }
  return response.json();
} 