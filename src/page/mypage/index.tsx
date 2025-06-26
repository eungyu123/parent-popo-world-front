import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../zustand/auth";
import { Modal } from "../../components/modal/Modal";
import defaultChildBoyImage from "../../assets/image/common/boy.png";
import defaultChildGirlImage from "../../assets/image/common/girl.png";
import parentsImage from "../../assets/image/common/parents.png";
import type { Child } from "../../zustand/auth";

export const MyPage: React.FC = () => {
  const [isOpenParentCode, setIsOpenParentCode] = useState(false);
  const { logout, child, user } = useAuthStore();

  // user 정보를 any로 타입 단언하여 추가 속성에 접근
  const userInfo = user as unknown as { name: string; parentCode: string; createdAt: string };

  const authStorage = localStorage.getItem("auth-storage");
  const authData = authStorage ? JSON.parse(authStorage) : null;
  const parentCode = authData?.state?.user?.parentCode;

  const quickMenus = [
    {
      title: "저축 리포트",
      description: "자녀 저축 현황 확인",
      path: "/savings/report",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "퀘스트 관리",
      description: "퀘스트 생성 및 관리",
      path: "/quest/create-quest",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "상점 관리",
      description: "상품 등록 및 관리",
      path: "/store/product-management",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "분석 센터",
      description: "자녀 활동 분석",
      path: "/analyze",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  return (
    <>
      <Modal isOpen={isOpenParentCode} onClose={() => setIsOpenParentCode(false)}>
        <div className="flex flex-col gap-4 bg-white rounded-3xl p-6 w-72" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 self-start">
              <div className="w-7 h-7 rounded-full bg-main-green-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                    fill="#4CAF50"
                  />
                </svg>
              </div>
              <h1 className="text-base font-bold text-gray-800">부모 코드</h1>
            </div>

            <div className="w-full bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-main-green-500 tracking-wider">{parentCode}</p>
            </div>
            <p className="text-sm text-gray-500 text-center">이 코드를 자녀계정에서 입력해주세요</p>
          </div>
        </div>
      </Modal>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white">
          {/* 헤더 */}
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">마이페이지</h1>
            <p className="text-gray-600">계정 정보와 설정을 관리하세요</p>
          </div>

          {/* 프로필 섹션 */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={parentsImage} alt="부모님" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{userInfo?.name || "부모님"}</h2>
                </div>
              </div>

              {/* 부모 정보 */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">부모 코드</span>
                  <span className="font-medium text-white">{parentCode || "미설정"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">등록된 자녀 수</span>
                  <span className="font-medium text-white">{child.length}명</span>
                </div>
                {userInfo?.createdAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">가입일</span>
                    <span className="font-medium text-white">
                      {new Date(userInfo.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpenParentCode(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                부모 코드 보기
              </button>
            </div>
          </div>
        </div>

        {/* 자녀 정보 섹션 */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">등록된 자녀</h3>
          <div className="space-y-3">
            {child.map((childInfo: Child) => (
              <div key={childInfo.userId} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={childInfo.sex === "M" ? defaultChildBoyImage : defaultChildGirlImage}
                    alt="child"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{childInfo.name}</h4>
                    <p className="text-sm text-gray-500">포인트: {childInfo.point}냥</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">활동 중</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 메뉴 */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">빠른 메뉴</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickMenus.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                className={`${menu.bgColor} rounded-xl p-4 transition-transform hover:scale-105`}
              >
                <h4 className={`font-semibold ${menu.textColor} mb-1`}>{menu.title}</h4>
                <p className="text-xs text-gray-600">{menu.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 설정 섹션 */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">설정</h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-gray-800">알림 설정</span>
            </button>
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-gray-800">도움말</span>
            </button>
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <span className="font-medium text-gray-800">앱 정보</span>
            </button>
            <button
              onClick={() => {
                console.log("로그아웃");
                logout();
              }}
              className="w-full px-4 py-4 text-left hover:bg-red-50 transition-colors text-red-600 font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
