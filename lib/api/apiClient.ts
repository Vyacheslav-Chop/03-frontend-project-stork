import { ApiResponse} from '@/types/user';
import { nextServer } from './api';

export const getUser = async (): Promise<ApiResponse> => {
  const res = await nextServer.get<ApiResponse>('/users');

  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');

  return res;
};
