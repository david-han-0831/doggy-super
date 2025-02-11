"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../firebase";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext"; // 전역 인증 상태 사용
import { usePublicAxios } from "../hooks/userPublicAxios"; // 인증 없이 사용할 public axios 인스턴스


export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const { setAccessToken } = useAuth(); // 전역 상태에 토큰 저장
    const axiosPublic = usePublicAxios(); // public axios 인스턴스 사용

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 실제 로그인 로직 구현
        console.log("로그인 시도:", formData);
        // 임시로 바로 대시보드로 이동
        router.push("/dashboard");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            // 🔹 Firebase 로그인 실행
            const idToken = await signInWithGoogle();
            if (!idToken) throw new Error("Firebase 토큰을 가져오지 못했습니다.");

            // 🔹 상태 업데이트
            setToken(idToken);
            // 2. public axios를 사용해 백엔드에 Firebase 토큰 전달하여 access token 발급 요청
      //    refresh token은 백엔드에서 httpOnly 쿠키로 관리되므로, 클라이언트에서는 접근 불가능
            const response = await axiosPublic.post("/auth/login", {
                firebase_token: idToken,
            });
            const data = response.data;
            console.log("✅ 로그인 응답:", data);
            // const response = await fetch("http://localhost:8000/api/v1/auth/login", {
            //     method: "POST",
            //     // headers: {
            //     //     "Authorization": `Bearer ${idToken}`,
            //     // },
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ firebase_token: idToken })
            // });

            // if (!response.ok) throw new Error("서버에서 응답을 받지 못했습니다.");

            
            
            if (data.code === 200 && data.data) {
                const { access_token } = data.data;
                // 3. 전역 상태에 access token 저장 (로컬스토리지에 저장하지 않음)
                setAccessToken(access_token);
    
                // 4. access token 디코딩 후 사용자 역할(role)에 따라 페이지 이동
                const decodedToken = jwtDecode(access_token);
                console.log("디코드된 토큰:", decodedToken);
                
                router.push("/dashboard");
                // 예시: role이 "superadmin"이면 dashboard 페이지로 이동
                // if (decodedToken.role === "superadmin") {
                //     router.push("/dashboard");
                // } else {
                //     // 다른 역할일 경우 원하는 페이지로 이동
                //     router.push("/");
                // }

            } else {
                throw new Error(data.msg || "로그인 실패");
            }
        } catch (err) {
            console.error("❌ 로그인 에러:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-stretch">
            {/* 왼쪽 브랜딩 섹션 */}
            <div className="hidden md:flex md:w-1/2 bg-[#717BFF] p-8 justify-center items-center">
                <div className="max-w-md text-white space-y-6">
                    <Image
                        src="/img/doggy-note-logo.png"
                        alt="Doggy Note Logo"
                        width={120}
                        height={120}
                        className="mx-auto"
                    />
                    <h2 className="text-3xl font-bold text-center">
                        Doggy Note
                    </h2>
                    <p className="text-center text-white/80">
                        반려동물 유치원을 위한 최고의 관리 솔루션
                    </p>
                </div>
            </div>

            {/* 오른쪽 로그인 폼 섹션 */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md space-y-8">
                    {/* 모바일에서만 보이는 로고 */}
                    <div className="md:hidden text-center space-y-4">
                        <Image
                            src="/img/doggy-note-logo.png"
                            alt="Doggy Note Logo"
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            도기노트 슈퍼 관리자 로그인
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            관리자 계정으로 로그인해주세요
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    이름
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#717BFF] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                                    placeholder="홍길동"
                                    autoComplete="username"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#717BFF] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-[#717BFF] hover:bg-[#5A60FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#717BFF] transition-all duration-200 font-medium text-sm shadow-lg shadow-[#717BFF]/30"
                        >
                            로그인
                        </button>

                        
                    </form>
                    {/* 테스트 */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-[#717BFF] hover:bg-[#5A60FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#717BFF] transition-all duration-200 font-medium text-sm shadow-lg shadow-[#717BFF]/30"
                    >
                        구글 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}
