import useSWR from 'swr';
import {
  getChecklists,
  getChecklist,
  createChecklist,
  updateChecklist,
  deleteChecklist,
  getChecklistItem,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} from '../api/checklists';

export function useChecklists() {
  const { data, error, mutate, isLoading } = useSWR('checklists', getChecklists);
  return { 
    checklistTemplates: data || [], 
    error, 
    mutate, 
    isLoading 
  };
}

export function useChecklist(id: number) {
  const { data, error, mutate, isLoading } = useSWR(id ? ['checklist', id] : null, () => getChecklist(id));
  return { checklist: data, error, mutate, isLoading };
}

export function useCreateChecklist() {
  return createChecklist;
}

export function useUpdateChecklist() {
  return updateChecklist;
}

export function useDeleteChecklist() {
  return deleteChecklist;
}

export function useChecklistItem(id: number) {
  const { data, error, mutate, isLoading } = useSWR(id ? ['checklist-item', id] : null, () => getChecklistItem(id));
  return { checklistItem: data, error, mutate, isLoading };
}

export function useCreateChecklistItem() {
  return createChecklistItem;
}

export function useUpdateChecklistItem() {
  return updateChecklistItem;
}

export function useDeleteChecklistItem() {
  return deleteChecklistItem;
} 