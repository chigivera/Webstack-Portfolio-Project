import useSWR from 'swr';
import {
  getUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from '../api/universities';

export function useUniversities(page = 1, limit = 10, search = '') {
  const { data, error, mutate, isLoading } = useSWR(
    ['universities', page, limit, search], 
    () => getUniversities(page, limit, search)
  );
  return {
    universities: data?.universities || [],
    pagination: data?.pagination,
    error,
    mutate,
    isLoading,
  };
}

export function useUniversity(id: number) {
  const { data, error, mutate, isLoading } = useSWR(id ? ['university', id] : null, () => getUniversity(id));
  return { university: data, error, mutate, isLoading };
}

export function useCreateUniversity() {
  return createUniversity;
}

export function useUpdateUniversity() {
  return updateUniversity;
}

export function useDeleteUniversity() {
  return deleteUniversity;
} 