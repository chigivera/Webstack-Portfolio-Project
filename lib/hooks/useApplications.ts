import useSWR from 'swr';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../api/applications';

export function useApplications(page = 1, limit = 10) {
  const { data, error, mutate, isLoading } = useSWR(['applications', page, limit], () => getApplications(page, limit));
  return {
    applications: data?.applications || [],
    pagination: data?.pagination,
    error,
    mutate,
    isLoading,
  };
}

export function useApplication(id: number) {
  const { data, error, mutate, isLoading } = useSWR(id ? ['application', id] : null, () => getApplication(id));
  return { application: data, error, mutate, isLoading };
}

export function useCreateApplication() {
  return createApplication;
}

export function useUpdateApplication() {
  return updateApplication;
}

export function useDeleteApplication() {
  return deleteApplication;
} 