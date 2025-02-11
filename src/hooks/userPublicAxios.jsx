// doggy-super/src/hooks/usePublicAxios.jsx
import axios from "axios";
import { useMemo } from "react";

export const usePublicAxios = () => {
  // 쿠키 전송 없이 기본 URL만 사용하는 인스턴스 생성
  const axiosPublicInstance = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8000/api/v1", // 백엔드 API 기본 URL
      withCredentials: false, // 로그인 전에는 쿠키 전송 필요 없음
    });
  }, []);

  return axiosPublicInstance;
};
