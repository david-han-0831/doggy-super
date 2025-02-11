"use client";

// doggy-super/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 인증 관련 전역 상태를 관리하기 위한 Context 생성
const AuthContext = createContext();

// AuthProvider: 앱 전체에서 인증 상태(토큰 등)를 관리합니다.
export const AuthProvider = ({ children }) => {
  // 로그인 후 백엔드에서 받은 access token을 저장 (메모리/전역 상태)
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // accessToken이 변경될 때마다 사용자 정보 조회
  useEffect(() => {
    if (accessToken) {
      axios
        .get("http://localhost:8000/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
          if (res.data.code === 200 && res.data.data) {
            setUser(res.data.data);
          }
        })
        .catch((err) => {
          console.error("사용자 정보 조회 에러:", err);
        });
    }
  }, [accessToken]);
  // refresh token은 httpOnly 쿠키에 저장되므로 직접 접근할 수 없으며,
  // 이 함수를 호출하여 새로운 access token을 발급받습니다.
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/refresh",
        {}, // 필요한 경우 요청 body 추가
        { withCredentials: true } // httpOnly 쿠키 전송을 위해
      );
      if (response.data.code === 200 && response.data.data) {
        const newToken = response.data.data.access_token;
        setAccessToken(newToken);
        return newToken;
      } else {
        console.error("토큰 갱신 실패:", response.data.msg);
        return null;
      }
    } catch (error) {
      console.error("Refresh token 요청 에러:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
