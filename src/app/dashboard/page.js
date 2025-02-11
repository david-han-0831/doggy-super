"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

// 임시 데이터
const MOCK_STATS = {
    totalKindergartens: 20,
    activeKindergartens: 8,
    pendingKindergartens: 5,
    suspendedKindergartens: 4,
    rejectedKindergartens: 3,
    totalUsers: 1250,
    newUsersThisMonth: 125,
    totalRevenue: 15000000,
    recentRegistrations: [
        {
            id: 1,
            name: "멍멍 유치원",
            owner: "김철수",
            status: "pending",
            registeredAt: "2024-03-15",
        },
        {
            id: 2,
            name: "행복한 강아지",
            owner: "이영희",
            status: "pending",
            registeredAt: "2024-03-14",
        },
        {
            id: 3,
            name: "퍼피 하우스",
            owner: "박지민",
            status: "pending",
            registeredAt: "2024-03-13",
        },
    ],
};

export default function DashboardPage() {
    const { accessToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // 로그인 상태가 아니면 로그인 페이지로 이동
        if (!accessToken) {
            alert("로그인 상태가 아닙니다.");   
            router.push("/");
        }
    }, [accessToken, router]);

    // 로그인 상태가 아니면 로그인 페이지로 이동
    if (!accessToken) {
        return null;
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* 주요 통계 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">전체 유치원</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C2C7FF]/20 text-[#717BFF]">
                                Total
                            </span>
                        </div>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                            {MOCK_STATS.totalKindergartens}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">운영중</p>
                                <p className="mt-1 font-medium text-gray-900 dark:text-white">{MOCK_STATS.activeKindergartens}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">승인대기</p>
                                <p className="mt-1 font-medium text-gray-900 dark:text-white">{MOCK_STATS.pendingKindergartens}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">전체 회원</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500">
                                Total
                            </span>
                        </div>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                            {MOCK_STATS.totalUsers.toLocaleString()}
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-500 dark:text-gray-400">이번 달 신규</p>
                            <p className="mt-1 font-medium text-gray-900 dark:text-white">
                                +{MOCK_STATS.newUsersThisMonth.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">매출</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500">
                                Monthly
                            </span>
                        </div>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                            {MOCK_STATS.totalRevenue.toLocaleString()}원
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="ml-1 text-sm text-green-500">8.2% vs last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">운영 현황</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-500">
                                Status
                            </span>
                        </div>
                        <div className="mt-2 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">운영중</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{MOCK_STATS.activeKindergartens}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">승인대기</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{MOCK_STATS.pendingKindergartens}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">운영중지</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{MOCK_STATS.suspendedKindergartens}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">반려</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{MOCK_STATS.rejectedKindergartens}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 최근 등록 신청 */}
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">최근 등록 신청</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        유치원명
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        대표자
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        신청일
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        상태
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {MOCK_STATS.recentRegistrations.map((registration) => (
                                    <tr key={registration.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {registration.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {registration.owner}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {registration.registeredAt}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500">
                                                승인대기
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
