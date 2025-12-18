import { api as realApi } from '@/lib/api';
import { mockApi } from './mockApi';

const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';

export const api = useMock ? mockApi : realApi;
