// doggy-super/src/hooks/useAxios.jsx
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

export const useAxios = () => {
  const { accessToken, refreshToken } = useAuth();

  // Axios 인스턴스 생성 (기본 URL, 쿠키 전송 옵션 포함)
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8000/api/v1", // 백엔드 API 기본 URL
      withCredentials: true, // httpOnly 쿠키 전송
    });
  }, []);

  // 요청 인터셉터: 요청 시 access token이 있으면 헤더에 추가
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터: 401(Unauthorized) 에러 발생 시 refresh token을 사용해 토큰 갱신 후 재요청
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
