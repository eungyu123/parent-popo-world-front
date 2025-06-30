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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout, child, user } = useAuthStore();

  // user 정보를 any로 타입 단언하여 추가 속성에 접근
  const userInfo = user as unknown as {
    name: string;
    parentCode: string;
    createdAt: string;
  };

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
      <Modal
        isOpen={isOpenParentCode}
        onClose={() => setIsOpenParentCode(false)}
      >
        <div
          className="flex flex-col gap-4 bg-white rounded-3xl p-6 w-72"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 self-start">
              <div className="w-7 h-7 rounded-full bg-main-green-100 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              <p className="text-xl font-bold text-main-green-500 tracking-wider">
                {parentCode}
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              이 코드를 자녀계정에서 입력해주세요
            </p>
          </div>
        </div>
      </Modal>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div
          className="flex flex-col gap-4 bg-white rounded-3xl p-6 w-72"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 17V14H9V10H16V7L21 12L16 17ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6H14V4H5V20H14V18H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H14Z"
                  fill="#EF4444"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800">로그아웃</h2>
            <p className="text-sm text-gray-500 text-center">
              정말 로그아웃 하시겠습니까?
            </p>
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsLogoutModalOpen(false);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white relative">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="absolute right-4 top-3 flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17V14H9V10H16V7L21 12L16 17ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6H14V4H5V20H14V18H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H14Z"
                fill="currentColor"
              />
            </svg>
            <span>로그아웃</span>
          </button>
          {/* 헤더 */}
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              마이페이지
            </h1>
          </div>

          {/* 프로필 섹션 */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={parentsImage}
                    alt="부모님"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {userInfo?.name || "부모님"}
                  </h2>
                </div>
              </div>

              {/* 부모 정보 */}
              <div className="space-y-3 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">부모 코드</span>
                  <span className="font-medium text-white">
                    {parentCode || "미설정"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">등록된 자녀 수</span>
                  <span className="font-medium text-white">
                    {child.length}명
                  </span>
                </div>
                {userInfo?.createdAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">가입일</span>
                    <span className="font-medium text-white">
                      {new Date(userInfo.createdAt).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 자녀 정보 섹션 */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">등록된 자녀</h3>
          <div className="space-y-3">
            {child.map((childInfo: Child) => (
              <div
                key={childInfo.userId}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      childInfo.sex === "M"
                        ? defaultChildBoyImage
                        : defaultChildGirlImage
                    }
                    alt="child"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {childInfo.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      포인트: {childInfo.point}냥
                    </p>
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
        <div className="px-6 py-6 mb-[-1rem]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">빠른 메뉴</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickMenus.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                className={`${menu.bgColor} rounded-xl p-4 transition-transform hover:scale-105`}
              >
                <h4 className={`font-semibold ${menu.textColor} mb-1`}>
                  {menu.title}
                </h4>
                <p className="text-xs text-gray-600">{menu.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
