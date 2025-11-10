import { AccountCredentials, ShoppingItem, ShoppingItemEntry } from 'axios'
import axios, {AxiosRequestConfig} from 'axios'

const BASE_URL = `${import.meta.env.BASE_URL}`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type' : 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error : ', error.response || error.message || error)
    return Promise.reject(error.response?.data || new Error(error.message || '예상 못한 에러 발생'));
  }
);

// JWT 토큰 포함 요청 설정
const getRequestConfig = () : AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt');
  if(token) {
    return {
      headers: { Authorization: token}, // 'Bearer <token>' 형식으로 저장된 토큰 사용
    };
  }
  return {};
}

// 기존 API 관련 함수를 정의
export const login = async (creds : AccountCredentials): Promise<string> => {
  try {
    const response = await apiClient.post('/login', creds);
    const jwtToken = response.headers.authorization;
    if(!jwtToken) {
      throw new Error('JWT 토큰이 headers에 담겨있지 않습니다.');
    }
    return jwtToken;
  } catch (error) {
    console.log('username / password가 틀렸습니다.');
    // error 객체가 AxiosError 인스턴스인지 확인하는 과정 작성
    if(axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || `Login 실패(${error.response.status}
      })`);
    } else if (error instanceof Error) { throw error;
    throw new Error('예측 불가능한 오류가 로그인 상에서 발생했습니다.');
    }
  }
}

export const getItems = async () : Promise<ShoppingItem[]> => {
  const response = await apiClient.get('/api/items', getRequestConfig());
  return response.data;
}

export const addItem = async (item: ShoppingItemEntry): Promise<ShoppingItem> => {
  const response = await apiClient.post('/api/items', item, getRequestConfig());
  return response.data;
}

export const updateItem = async (id: number, itemUpdate: ShoppingItemEntry) : Promise<ShoppingItem> => {
  const response = await apiClient.put(`/api/items/${id}`, itemUpdate, getRequestConfig());
  return response.data;
}

export const deleteItem = async (id: number) : Promise<void> => {
  await apiClient.delete(`/api/items/${id}`, getRequestConfig());
}

// Google ID 토큰 백엔드 전송 및 JWT 수신 관련 함수
/*
  *Google ID 토큰을 백엔드로 보낸 다음 검증하고 앱의 JWT를 받아온다.
*/