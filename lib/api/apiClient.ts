import { ApiResponse} from '@/types/user';
import { nextServer } from './api';

export const getUser = async (): Promise<ApiResponse> => {
  const res = await nextServer.get<ApiResponse>('/users');

  return res.data;
};

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

