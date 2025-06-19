import React, { useState } from "react";
import { ChildCard } from "../../features/home/ChildCard";
import { StoreCard } from "../../features/home/StoreCard";
import { QuickIcons } from "../../features/home/QuickIcons";
import { InvestmentChart } from "../../features/home/InvestmentChart";
import defaultChildBoyImage from "../../assets/image/common/boy.png";
import defaultChildGirlImage from "../../assets/image/common/girl.png";
import { PopoButton } from "../../components/button/popoButton";
import { AddButton } from "../../components/button/AddButton";
import { Modal } from "../../components/modal/Modal";
import { useAuthStore } from "../../zustand/auth";
import { HomeQuestCard } from "../../features/home/HomeQuestCard";

export const HomePage: React.FC = () => {
  const [isOpenParentCode, setIsOpenParentCode] = useState(false);
  const [isOpenChildInfo, setIsOpenChildInfo] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const authStorage = localStorage.getItem("auth-storage");
  const authData = authStorage ? JSON.parse(authStorage) : null;
  const parentCode = authData?.state?.user?.parentCode;
  const { logout, child } = useAuthStore();

  const handleChildClick = (childData: any) => {
    setSelectedChild(childData);
    setIsOpenChildInfo(true);
  };

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

      <Modal isOpen={isOpenChildInfo} onClose={() => setIsOpenChildInfo(false)}>
        <div
          className="flex flex-col gap-3 bg-white rounded-3xl px-5 py-4 w-80"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedChild && (
            <>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src={
                      selectedChild.sex === "M"
                        ? defaultChildBoyImage
                        : defaultChildGirlImage
                    }
                    alt="프로필"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h1 className="text-base font-bold text-gray-800 truncate">
                    {selectedChild.name}
                  </h1>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-main-green-100 text-main-green-500">
                      {selectedChild.sex === "M" ? "남자" : "여자"}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-500">
                      {selectedChild.age}세
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">이메일</span>
                  <span className="text-sm text-gray-800 font-medium truncate max-w-[180px]">
                    {selectedChild.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">가입일</span>
                  <span className="text-sm text-gray-800 font-medium">
                    {new Date(selectedChild.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">보유 포인트</span>
                  <span className="text-sm font-bold text-main-green-500">
                    {selectedChild.point.toLocaleString()}P
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* 환영 문구 */}
      <div className="flex w-full mb-10">
        <div className="flex justify-between items-center gap-x-6">
          <PopoButton onClick={() => {}} />
          <div className="flex">
            <div className="flex flex-col">
              <span className="">안녕하세요!</span>
              <span className="">부모님 환영합니다!</span>
              <span className="" onClick={logout}>
                로그아웃
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 자녀 카드 */}
      {child.map((child) => (
        <div key={child.userId} onClick={() => handleChildClick(child)}>
          <ChildCard
            image={
              child.sex === "M" ? defaultChildBoyImage : defaultChildGirlImage
            }
            name={child.name}
            gender={child.sex === "M" ? "남자" : "여자"}
          />
        </div>
      ))}

      {/* 자녀 추가 등록 버튼 */}
      <AddButton
        text="자녀 추가 등록"
        onClick={() => setIsOpenParentCode(true)}
      />

      {/* 상점 화면 */}
      <div className="flex gap-x-5 justify-between h-60 mb-5">
        <StoreCard />
        <QuickIcons />
      </div>

      {/* 퀘스트 화면 */}
      <div className="flex gap-x-5 justify-between h-60 mb-5">
        <HomeQuestCard />
      </div>
      <InvestmentChart />
    </>
  );
};
