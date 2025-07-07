import useSWR from 'swr';
import {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../api/profiles';

export function useProfiles() {
  const { data, error, mutate, isLoading } = useSWR('profiles', getProfiles);
  return { profiles: data, error, mutate, isLoading };
}

export function useProfile(id: number) {
  const { data, error, mutate, isLoading } = useSWR(id ? ['profile', id] : null, () => getProfile(id));
  return { profile: data, error, mutate, isLoading };
}

export function useCreateProfile() {
  return createProfile;
}

export function useUpdateProfile() {
  return updateProfile;
}

export function useDeleteProfile() {
  return deleteProfile;
} 