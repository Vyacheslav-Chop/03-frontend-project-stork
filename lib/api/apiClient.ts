import { nextServer } from './api';

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}
