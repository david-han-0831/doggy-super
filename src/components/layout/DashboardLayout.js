"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from 'js-cookie';
import { usePublicAxios } from "../../hooks/userPublicAxios"; // 절대 경로 사용 (jsconfig.json 또는 tsconfig.json 설정에 따라)
import { useAuth } from "../../context/AuthContext"; // 필요시 전역 상태 초기화를 위해

const navigation = [
    {
        name: "대시보드",
        href: "/dashboard",
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
            </svg>
        ),
    },
    {
        name: "유치원 관리",
        href: "/kindergarten",
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
            </svg>
        ),
    },
    {
        name: "유저 관리",
        href: "/dashboard/accounts",
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        ),
    },
    {
        name: "설정",
        href: "/dashboard/settings",
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
];

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const axiosPublic = usePublicAxios(); // 인증 없이 사용할 public axios 인스턴스
    const { setAccessToken } = useAuth(); // 전역 인증 상태 초기화 (필요시 사용)
    
    // 테마 관련 상태 추가
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 컴포넌트 마운트 시 쿠키에서 테마 설정 불러오기
    useEffect(() => {
        const theme = Cookies.get('theme');
        if (theme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // 테마 토글 함수
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            Cookies.set('theme', 'light', { expires: 365 }); // 1년간 유지
        } else {
            document.documentElement.classList.add('dark');
            Cookies.set('theme', 'dark', { expires: 365 });
        }
        setIsDarkMode(!isDarkMode);
    };

    const currentPage = navigation.find(item => item.href === pathname);

    const handleLogout = async () => {
        try {
            // 로그아웃 엔드포인트 호출 시 withCredentials 옵션을 true로 하여 httpOnly 쿠키(Refresh Token)가 전송되도록 함
            await axiosPublic.post("/auth/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error("로그아웃 요청 에러:", error);
        }
        // 전역 상태에서 access token 등 인증 정보를 초기화할 수 있다면 처리 (예: setAccessToken(null);)
        // 그리고 로그인 페이지(또는 초기 화면)로 리다이렉트
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* 사이드바 (모바일) */}
            <div
                className={`fixed inset-0 z-50 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            >
                <div
                    className="fixed inset-0 bg-gray-900/80"
                    onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800">
                    <SidebarContent pathname={pathname} />
                </div>
            </div>

            {/* 사이드바 (데스크톱) */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6">
                    <SidebarContent pathname={pathname} />
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:pl-64">
                {/* 헤더 */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="lg:hidden -m-2.5 p-2.5 text-gray-500 dark:text-gray-200"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>

                    {/* 헤이지 타이틀 */}
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {currentPage?.name}
                        </h1>
                    </div>

                    {/* 헤더 우측 영역 */}
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        {/* 테마 토글 버튼 */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#717BFF] dark:hover:text-[#717BFF] transition-all duration-200"
                            title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            <span className="text-base font-bold mr-1">홍길동</span>
                            님 환영합니다
                        </span>
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                        <button 
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#717BFF] dark:hover:text-[#717BFF] transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>

                {/* 페이지 콘텐츠 */}
                <main className="py-8 bg-gray-50 dark:bg-gray-900">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ pathname }) {
    return (
        <>
            <div className="flex h-16 shrink-0 items-center">
                <div className="w-10 h-10 relative">
                    <Image
                        src="/img/doggy-note-logo.png"
                        alt="Doggy Note Logo"
                        fill
                        priority
                        sizes="40px"
                        className="object-contain"
                    />
                </div>
                <span className="ml-2 text-xl font-semibold text-[#717BFF]">
                    Doggy Note
                </span>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul
                    role="list"
                    className="flex flex-1 flex-col gap-y-7"
                >
                    <li>
                        <ul
                            role="list"
                            className="-mx-2 space-y-1"
                        >
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            group flex gap-x-3 rounded-md p-2 text-sm leading-6
                                            ${
                                                pathname === item.href
                                                    ? "bg-[#F5F6FF] dark:bg-gray-700 text-[#717BFF]"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#717BFF]"
                                            }
                                        `}
                                    >
                                        <span className="h-5 w-5 shrink-0 flex items-center justify-center">
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
}
