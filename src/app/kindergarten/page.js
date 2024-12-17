"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const MOCK_KINDERGARTENS = [
    {
        id: 1,
        name: "멍멍 유치원",
        owner: "김철수",
        phone: "02-1234-5678",
        email: "woofwoof@example.com",
        address: "서울시 강남구 역삼동 123-45",
        status: "active",
        registeredAt: "2024-01-15",
        businessNumber: "123-45-67890",
        description: "반려동물을 위한 최고의 유치원입니다.",
    },
    {
        id: 2,
        name: "행복한 강아지",
        owner: "이영희",
        phone: "02-4567-8901",
        email: "happydog@example.com",
        address: "서울시 서초구 서초동 456-78",
        status: "pending",
        registeredAt: "2024-02-20",
        businessNumber: "456-78-90123",
        description:
            "행복한 강아지 유치원은 행복한 강아지를 위한 유치원입니다.",
    },
    {
        id: 3,
        name: "퍼피 하우스",
        owner: "박지민",
        phone: "02-7890-1234",
        email: "puppyhouse@example.com",
        address: "서울시 송파구 잠실동 789-10",
        status: "active",
        registeredAt: "2024-01-10",
        businessNumber: "789-01-23456",
        description: "퍼피 하우스는 퍼피를 위한 유치원입니다.",
    },
    {
        id: 4,
        name: "도그파크",
        owner: "최민수",
        phone: "02-2345-6789",
        email: "dogpark@example.com",
        address: "서울시 마포구 합정동 234-56",
        status: "suspended",
        registeredAt: "2024-01-05",
        businessNumber: "234-56-78901",
        description: "반려견의 행복한 하루를 책임지는 프리미엄 유치원입니다.",
    },
    {
        id: 5,
        name: "해피테일",
        owner: "정다운",
        phone: "02-3456-7890",
        email: "happytail@example.com",
        address: "서울시 용산구 이태원동 345-67",
        status: "rejected",
        registeredAt: "2024-02-15",
        businessNumber: "345-67-89012",
        description: "반려동물 전문가들이 운영하는 특별한 공간입니다.",
    },
    {
        id: 6,
        name: "멍멍스쿨",
        owner: "이하나",
        phone: "02-4567-8901",
        email: "woofschool@example.com",
        address: "서울시 강서구 화곡동 456-78",
        status: "active",
        registeredAt: "2024-01-20",
        businessNumber: "456-78-90123",
        description: "반려견의 사회화 교육 전문 유치원입니다.",
    },
    {
        id: 7,
        name: "캣앤독",
        owner: "김민지",
        phone: "02-5678-9012",
        email: "catanddog@example.com",
        address: "서울시 노원구 상계동 567-89",
        status: "pending",
        registeredAt: "2024-02-25",
        businessNumber: "567-89-01234",
        description: "강아지와 고양이가 함께하는 특별한 공간입니다.",
    },
    {
        id: 8,
        name: "퍼피랜드",
        owner: "박서준",
        phone: "02-6789-0123",
        email: "puppyland@example.com",
        address: "서울시 도봉구 방학동 678-90",
        status: "active",
        registeredAt: "2024-01-08",
        businessNumber: "678-90-12345",
        description: "즐거운 놀이와 교육이 함께하는 유치원입니다.",
    },
    {
        id: 9,
        name: "도그빌리지",
        owner: "최유진",
        phone: "02-7890-1234",
        email: "dogvillage@example.com",
        address: "서울시 은평구 불광동 789-01",
        status: "suspended",
        registeredAt: "2024-01-12",
        businessNumber: "789-01-23456",
        description: "반려견 맞춤형 교육 프로그램을 제공합니다.",
    },
    {
        id: 10,
        name: "해피도그",
        owner: "정성훈",
        phone: "02-8901-2345",
        email: "happydog@example.com",
        address: "서울시 강동구 천호동 890-12",
        status: "rejected",
        registeredAt: "2024-02-18",
        businessNumber: "890-12-34567",
        description: "행복한 반려견 교육의 시작입니다.",
    },
    {
        id: 11,
        name: "펫케어센터",
        owner: "한지민",
        phone: "02-9012-3456",
        email: "petcare@example.com",
        address: "서울시 관악구 신림동 901-23",
        status: "active",
        registeredAt: "2024-01-25",
        businessNumber: "901-23-45678",
        description: "전문 트레이너와 함께하는 맞춤형 케어 서비스",
    },
    {
        id: 12,
        name: "러브퍼피",
        owner: "송민호",
        phone: "02-0123-4567",
        email: "lovepuppy@example.com",
        address: "서울시 동작구 상도동 012-34",
        status: "pending",
        registeredAt: "2024-02-28",
        businessNumber: "012-34-56789",
        description: "사랑과 전문성으로 보살피는 프리미엄 유치원",
    },
    {
        id: 13,
        name: "도그드림",
        owner: "임수진",
        phone: "02-1234-5678",
        email: "dogdream@example.com",
        address: "서울시 중랑구 면목동 123-45",
        status: "active",
        registeredAt: "2024-01-30",
        businessNumber: "123-45-67890",
        description: "반려견의 꿈을 키우는 특별한 공간",
    },
    {
        id: 14,
        name: "펫플레이",
        owner: "강동원",
        phone: "02-2345-6789",
        email: "petplay@example.com",
        address: "서울시 광진구 자양동 234-56",
        status: "suspended",
        registeredAt: "2024-01-15",
        businessNumber: "234-56-78901",
        description: "놀이를 통한 즐거운 교육",
    },
    {
        id: 15,
        name: "도그하우스",
        owner: "윤아라",
        phone: "02-3456-7890",
        email: "doghouse@example.com",
        address: "서울시 성북구 길음동 345-67",
        status: "active",
        registeredAt: "2024-02-01",
        businessNumber: "345-67-89012",
        description: "우리 아이의 두 번째 집",
    },
    {
        id: 16,
        name: "펫스마트",
        owner: "류준열",
        phone: "02-4567-8901",
        email: "petsmart@example.com",
        address: "서울시 동대문구 이문동 456-78",
        status: "pending",
        registeredAt: "2024-02-22",
        businessNumber: "456-78-90123",
        description: "스마트한 반려동물 교육 시스템",
    },
    {
        id: 17,
        name: "도그시티",
        owner: "오지호",
        phone: "02-5678-9012",
        email: "dogcity@example.com",
        address: "서울시 성동구 성수동 567-89",
        status: "rejected",
        registeredAt: "2024-02-10",
        businessNumber: "567-89-01234",
        description: "도시 속 반려견 놀이터",
    },
    {
        id: 18,
        name: "펫파크",
        owner: "신민아",
        phone: "02-6789-0123",
        email: "petpark@example.com",
        address: "서울시 양천구 목동 678-90",
        status: "active",
        registeredAt: "2024-01-18",
        businessNumber: "678-90-12345",
        description: "자연 속에서 배우는 반려견 교육",
    },
    {
        id: 19,
        name: "도그아카데미",
        owner: "김우빈",
        phone: "02-7890-1234",
        email: "dogacademy@example.com",
        address: "서울시 구로구 구로동 789-01",
        status: "active",
        registeredAt: "2024-01-22",
        businessNumber: "789-01-23456",
        description: "전문적인 반려견 교육 아카데미",
    },
    {
        id: 20,
        name: "펫유치원",
        owner: "배수지",
        phone: "02-8901-2345",
        email: "petkinder@example.com",
        address: "서울시 금천구 가산동 890-12",
        status: "pending",
        registeredAt: "2024-02-15",
        businessNumber: "890-12-34567",
        description: "즐거운 추억을 만드는 반려견 유치원",
    },
];

export default function KindergartenPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: "all", // 'all', 'active', 'pending'
    });
    const [kindergartens, setKindergartens] = useState(MOCK_KINDERGARTENS);
    const [selectedKindergarten, setSelectedKindergarten] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [statusChangeType, setStatusChangeType] = useState(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [newKindergarten, setNewKindergarten] = useState({
        name: "",
        owner: "",
        phone: "",
        email: "",
        address: "",
        businessNumber: "",
        description: "",
        businessLicense: null,
        facilityPhotos: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedItems, setSelectedItems] = useState([]);
    const [sidebarMode, setSidebarMode] = useState("new"); // 'new', 'detail'

    const filteredKindergartens = kindergartens.filter((k) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
            k.name.toLowerCase().includes(term) ||
            k.owner.toLowerCase().includes(term) ||
            k.address.toLowerCase().includes(term);

        const matchesStatus =
            filters.status === "all" ? true : k.status === filters.status;

        return matchesSearch && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredKindergartens.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredKindergartens.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // 페이지당 항목 수 변경 시 첫 페이지로 이동
    };

    const handleOpenModal = (kindergarten) => {
        setSelectedKindergarten(kindergarten);
        setIsModalOpen(true);
    };

    const handleStatusChange = (kindergarten, type) => {
        setSelectedKindergarten(kindergarten);
        setStatusChangeType(type);
        setIsConfirmModalOpen(true);
    };

    const confirmStatusChange = () => {
        const newStatus = {
            approve: "active",
            reject: "rejected",
            suspend: "suspended",
            activate: "active",
        }[statusChangeType];

        setKindergartens(
            kindergartens.map((k) =>
                k.id === selectedKindergarten.id
                    ? { ...k, status: newStatus }
                    : k
            )
        );
        setSelectedKindergarten({
            ...selectedKindergarten,
            status: newStatus,
        });
        setIsConfirmModalOpen(false);
    };

    const handleRegister = () => {
        const requiredFields = [
            "name",
            "owner",
            "businessNumber",
            "phone",
            "email",
            "address",
            "businessLicense",
        ];
        const missingFields = requiredFields.filter(
            (field) => !newKindergarten[field]
        );

        if (missingFields.length > 0) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        if (newKindergarten.facilityPhotos.length < 3) {
            alert("시설 사진을 3장 이상 등록해주세요.");
            return;
        }

        const newData = {
            ...newKindergarten,
            id: kindergartens.length + 1,
            status: "pending",
            registeredAt: new Date().toISOString().split("T")[0],
        };

        setKindergartens([...kindergartens, newData]);
        setIsRegisterModalOpen(false);
        setNewKindergarten({
            name: "",
            owner: "",
            phone: "",
            email: "",
            address: "",
            businessNumber: "",
            description: "",
            businessLicense: null,
            facilityPhotos: [],
        });
    };

    // 엑셀 다운로드 함수 추가
    const handleExcelDownload = () => {
        // CSV 형식으로 데이터 변환
        const headers = [
            "유치원명",
            "대표자",
            "연락처",
            "이메일",
            "주소",
            "사업자등록번호",
            "상태",
            "등록일",
        ];
        const csvData = [
            headers.join(","),
            ...filteredKindergartens.map((k) =>
                [
                    k.name,
                    k.owner,
                    k.phone,
                    k.email,
                    k.address,
                    k.businessNumber,
                    k.status === "active"
                        ? "운영중"
                        : k.status === "pending"
                        ? "승인대기"
                        : k.status === "rejected"
                        ? "반려됨"
                        : "운영중지",
                    k.registeredAt,
                ].join(",")
            ),
        ].join("\n");

        // CSV 파일 생성 및 다운로드
        const blob = new Blob(["\uFEFF" + csvData], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `유치원_목록_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    // 전체 선택/해제 핸들러
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(currentItems.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    // 별 선택/해제 핸들러
    const handleSelectItem = (id) => {
        setSelectedItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const getStatusChangeMessage = () => {
        const messages = {
            approve: "승인",
            reject: "반려",
            suspend: "운영 중지",
            activate: "운영 재개",
        };
        return `${selectedKindergarten.name}을(를) ${messages[statusChangeType]}하시겠습니까?`;
    };

    // 사이드바 모드 변경 핸들러
    const handleSidebarMode = (mode, kindergarten = null) => {
        setSidebarMode(mode);
        if (kindergarten) {
            setSelectedKindergarten(kindergarten);
        }
    };

    return (
        <DashboardLayout>
            <div className="absolute inset-0 left-[280px] top-16 overflow-hidden">
                {/* 메인 영역 */}
                <div className="h-full pr-[400px]">
                    <div className="h-full flex flex-col">
                        {/* 검색 및 필터 영역 - 고정 */}
                        <div className="flex-shrink-0 px-6 pt-3 pb-4">
                            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-sm">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                            <svg
                                                className="w-5 h-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 
                                                bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl
                                                text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                                focus:ring-2 focus:ring-[#717BFF] focus:border-transparent
                                                transition-all duration-200"
                                            placeholder="유치원명, 대표자, 주소로 검색"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        onClick={handleExcelDownload}
                                        className="inline-flex items-center px-4 py-2.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        엑셀 다운로드
                                    </button>
                                    <button
                                        onClick={() =>
                                            setFilterOpen(!filterOpen)
                                        }
                                        className={`inline-flex items-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                            filters.status !== "all"
                                                ? "border-[#717BFF] text-[#717BFF] bg-[#C2C7FF]/20"
                                                : "border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                                        }`}
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                        필터
                                        {filters.status !== "all" && (
                                            <span className="ml-1 w-2 h-2 rounded-full bg-[#717BFF]" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 테이블 영역 */}
                        <div className="flex-1 px-6 pb-6 min-h-0">
                            <div className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm flex flex-col">
                                {/* 테이블 헤더 - 고정 */}
                                <div className="flex-shrink-0">
                                    <table className="min-w-full">
                                        <thead className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-t-2xl">
                                            <tr className="rounded-t-2xl overflow-hidden">
                                                <th className="w-[40px] px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider first:rounded-tl-2xl">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 
                                                            text-[#717BFF] bg-white dark:bg-gray-700
                                                            checked:bg-[#717BFF] checked:border-[#717BFF]
                                                            dark:checked:bg-[#717BFF] dark:checked:border-[#717BFF]
                                                            focus:ring-[#717BFF] focus:ring-offset-0
                                                            hover:cursor-pointer transition-colors duration-200"
                                                        checked={
                                                            selectedItems.length ===
                                                            currentItems.length
                                                        }
                                                        onChange={
                                                            handleSelectAll
                                                        }
                                                    />
                                                </th>
                                                <th className="w-[200px] px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                    유치원명
                                                </th>
                                                <th className="w-[120px] px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                    대표자
                                                </th>
                                                <th className="w-[300px] px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                    주소
                                                </th>
                                                <th className="w-[120px] px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider last:rounded-tr-2xl">
                                                    상태
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                {/* 테이블 바디 - 스크롤 */}
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                                            {currentItems.map(
                                                (kindergarten) => (
                                                    <tr
                                                        key={kindergarten.id}
                                                        onClick={() =>
                                                            handleSidebarMode(
                                                                "detail",
                                                                kindergarten
                                                            )
                                                        }
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                                                    >
                                                        <td
                                                            className="w-[40px] px-6 py-4 whitespace-nowrap text-center"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 
                                                                text-[#717BFF] bg-white dark:bg-gray-700
                                                                checked:bg-[#717BFF] checked:border-[#717BFF]
                                                                dark:checked:bg-[#717BFF] dark:checked:border-[#717BFF]
                                                                focus:ring-[#717BFF] focus:ring-offset-0
                                                                hover:cursor-pointer transition-colors duration-200"
                                                                checked={selectedItems.includes(
                                                                    kindergarten.id
                                                                )}
                                                                onChange={() =>
                                                                    handleSelectItem(
                                                                        kindergarten.id
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="w-[200px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {kindergarten.name}
                                                        </td>
                                                        <td className="w-[120px] px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                                                            {kindergarten.owner}
                                                        </td>
                                                        <td className="w-[300px] px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {
                                                                kindergarten.address
                                                            }
                                                        </td>
                                                        <td className="w-[120px] px-6 py-4 whitespace-nowrap text-center">
                                                            <span
                                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                                            ${
                                                                kindergarten.status ===
                                                                "active"
                                                                    ? "bg-[#C2C7FF]/20 text-[#717BFF]"
                                                                    : kindergarten.status ===
                                                                      "pending"
                                                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                                                                    : kindergarten.status ===
                                                                      "rejected"
                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500"
                                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                            }`}
                                                            >
                                                                {/* 상태별 아이콘 */}
                                                                {kindergarten.status ===
                                                                    "active" && (
                                                                    <svg
                                                                        className="w-3.5 h-3.5 mr-1"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                {kindergarten.status ===
                                                                    "pending" && (
                                                                    <svg
                                                                        className="w-3.5 h-3.5 mr-1"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                {kindergarten.status ===
                                                                    "rejected" && (
                                                                    <svg
                                                                        className="w-3.5 h-3.5 mr-1"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                {kindergarten.status ===
                                                                    "suspended" && (
                                                                    <svg
                                                                        className="w-3.5 h-3.5 mr-1"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                {/* 상태 텍스트 */}
                                                                {kindergarten.status ===
                                                                "active"
                                                                    ? "운영중"
                                                                    : kindergarten.status ===
                                                                      "pending"
                                                                    ? "승인대기"
                                                                    : kindergarten.status ===
                                                                      "rejected"
                                                                    ? "반려됨"
                                                                    : "운영중지"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 페이징 영역 - 고정 */}
                                <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                value={itemsPerPage}
                                                onChange={(e) =>
                                                    handleItemsPerPageChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            >
                                                <option value={10}>
                                                    10개씩
                                                </option>
                                                <option value={20}>
                                                    20개씩
                                                </option>
                                                <option value={50}>
                                                    50개씩
                                                </option>
                                            </select>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                총{" "}
                                                {filteredKindergartens.length}개
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
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
                                                        d="M15 19l-7-7 7-7"
                                                    />
                                                </svg>
                                            </button>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1
                                            ).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() =>
                                                        handlePageChange(page)
                                                    }
                                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                                        currentPage === page
                                                            ? "bg-[#717BFF] text-white"
                                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
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
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 사이드 패널 */}
                <div className="absolute top-0 right-0 w-[400px] h-full bg-white dark:bg-gray-800 border-l border-gray-200/50 dark:border-gray-700/50">
                    <div className="h-full flex flex-col">
                        {/* 헤더 */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {sidebarMode === "new"
                                    ? "신규 유치원 등록"
                                    : "유치원 상세 정보"}
                            </h3>
                            {sidebarMode === "detail" && (
                                <button
                                    onClick={() => handleSidebarMode("new")}
                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#717BFF] text-white hover:bg-[#6268FF] transition-colors duration-200"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    신규 등록
                                </button>
                            )}
                        </div>

                        {/* 콘텐츠 */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {sidebarMode === "new" ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                유치원명{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                                value={newKindergarten.name}
                                                onChange={(e) =>
                                                    setNewKindergarten({
                                                        ...newKindergarten,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                대표자{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                                value={newKindergarten.owner}
                                                onChange={(e) =>
                                                    setNewKindergarten({
                                                        ...newKindergarten,
                                                        owner: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                연락처{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                                value={newKindergarten.phone}
                                                onChange={(e) =>
                                                    setNewKindergarten({
                                                        ...newKindergarten,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                이메일{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                                value={newKindergarten.email}
                                                onChange={(e) =>
                                                    setNewKindergarten({
                                                        ...newKindergarten,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            주소{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                            value={newKindergarten.address}
                                            onChange={(e) =>
                                                setNewKindergarten({
                                                    ...newKindergarten,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            사업자등록번호{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                            value={
                                                newKindergarten.businessNumber
                                            }
                                            onChange={(e) =>
                                                setNewKindergarten({
                                                    ...newKindergarten,
                                                    businessNumber:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            설명
                                        </label>
                                        <textarea
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                            rows="3"
                                            value={newKindergarten.description}
                                            onChange={(e) =>
                                                setNewKindergarten({
                                                    ...newKindergarten,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            사업자등록증{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                            onChange={(e) =>
                                                setNewKindergarten({
                                                    ...newKindergarten,
                                                    businessLicense:
                                                        e.target.files[0],
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            시설 사진{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#717BFF] focus:border-transparent"
                                            onChange={(e) =>
                                                setNewKindergarten({
                                                    ...newKindergarten,
                                                    facilityPhotos: Array.from(
                                                        e.target.files
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            ) : (
                                sidebarMode === "detail" &&
                                selectedKindergarten && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {selectedKindergarten.name}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                                ${
                                                    selectedKindergarten.status ===
                                                    "active"
                                                        ? "bg-[#C2C7FF]/20 text-[#717BFF]"
                                                        : selectedKindergarten.status ===
                                                          "pending"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                                                        : selectedKindergarten.status ===
                                                          "rejected"
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                }`}
                                            >
                                                {/* 상태 아이콘과 텍스트 */}
                                                {selectedKindergarten.status ===
                                                "active"
                                                    ? "운영중"
                                                    : selectedKindergarten.status ===
                                                      "pending"
                                                    ? "승인대기"
                                                    : selectedKindergarten.status ===
                                                      "rejected"
                                                    ? "반려됨"
                                                    : "운영중지"}
                                            </span>
                                        </div>

                                        {/* 상세 정보 */}
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        대표자
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                        {
                                                            selectedKindergarten.owner
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        사업자등록번호
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                        {
                                                            selectedKindergarten.businessNumber
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        연락처
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                        {
                                                            selectedKindergarten.phone
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        이메일
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                        {
                                                            selectedKindergarten.email
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    주소
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {
                                                        selectedKindergarten.address
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    설명
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {
                                                        selectedKindergarten.description
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    등록일
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {
                                                        selectedKindergarten.registeredAt
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* 상태 관리 버튼 */}
                                        <div className="mt-8">
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                                                상태 관리
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedKindergarten.status ===
                                                    "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    selectedKindergarten,
                                                                    "approve"
                                                                )
                                                            }
                                                            className="inline-flex items-center px-4 py-2 rounded-lg border border-[#717BFF] bg-[#717BFF]/10 text-[#717BFF] hover:bg-[#717BFF] hover:text-white text-sm font-medium transition-all duration-200"
                                                        >
                                                            승인
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    selectedKindergarten,
                                                                    "reject"
                                                                )
                                                            }
                                                            className="inline-flex items-center px-4 py-2 rounded-lg border border-red-500 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-900/20 dark:hover:bg-red-500 text-xs font-medium transition-all duration-200"
                                                        >
                                                            반려
                                                        </button>
                                                    </>
                                                )}
                                                {selectedKindergarten.status ===
                                                    "active" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                selectedKindergarten,
                                                                "suspend"
                                                            )
                                                        }
                                                        className="inline-flex items-center px-4 py-2 rounded-lg border border-yellow-500 bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-white text-sm font-medium transition-all duration-200"
                                                    >
                                                        운영중지
                                                    </button>
                                                )}
                                                {selectedKindergarten.status ===
                                                    "suspended" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                selectedKindergarten,
                                                                "activate"
                                                            )
                                                        }
                                                        className="inline-flex items-center px-4 py-2 rounded-lg border border-[#717BFF] bg-[#717BFF]/10 text-[#717BFF] hover:bg-[#717BFF] hover:text-white text-sm font-medium transition-all duration-200"
                                                    >
                                                        운영재개
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* 하단 버튼 */}
                        <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex justify-end gap-3">
                                {sidebarMode === "new" && (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleSidebarMode("detail")
                                            }
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            취소
                                        </button>
                                        <button
                                            onClick={handleRegister}
                                            className="px-4 py-2 rounded-lg bg-[#717BFF] text-white hover:bg-[#6268FF] transition-colors duration-200"
                                        >
                                            등록
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
