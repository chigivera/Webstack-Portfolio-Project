import type { ChecklistTemplate, ChecklistItem } from '../types';

export async function getChecklists() {
  const response = await fetch('/api/checklists');
  if (!response.ok) {
    throw new Error('Failed to fetch checklists');
  }
  return response.json();
}

export async function getChecklist(id: number) {
  const res = await fetch(`/api/checklists/${id}`);
  if (!res.ok) throw new Error('Failed to fetch checklist');
  return res.json();
}

export async function createChecklist(data: Partial<ChecklistTemplate>) {
  const res = await fetch('/api/checklists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create checklist');
  return res.json();
}

export async function updateChecklist(id: number, data: Partial<ChecklistTemplate>) {
  const res = await fetch(`/api/checklists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update checklist');
  return res.json();
}

export async function deleteChecklist(id: number) {
  const res = await fetch(`/api/checklists/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete checklist');
  return res.json();
}

export async function getChecklistItem(id: number) {
  const response = await fetch(`/api/checklist-items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch checklist item');
  }
  return response.json();
}

export async function createChecklistItem(data: Partial<ChecklistItem>) {
  const response = await fetch('/api/checklists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create checklist item');
  }
  return response.json();
}

export async function updateChecklistItem(id: number, data: Partial<ChecklistItem>) {
  const response = await fetch(`/api/checklist-items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update checklist item');
  }
  return response.json();
}

export async function deleteChecklistItem(id: number) {
  const response = await fetch(`/api/checklist-items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete checklist item');
  }
  return response.json();
} 