import React, { useState } from "react";
import { ChildCard } from "../../features/home/ChildCard";
import defaultChildBoyImage from "../../assets/image/common/boy.png";
import defaultChildGirlImage from "../../assets/image/common/girl.png";
import { PopoButton } from "../../components/button/popoButton";
import { Modal } from "../../components/modal/Modal";
import { useAuthStore } from "../../zustand/auth";
import { IMAGE_URLS } from "../../constants/constants";
import type { Child } from "../../zustand/auth";
import { Link } from "react-router-dom";
import analyzeCenter from "../../assets/image/common/analyze_center.png";
import { AddButton } from "../../components/button/AddButton";
import investIcon from "../../assets/image/common/popo_stock.png";
import popoStockIcon from "../../assets/image/common/popo_stock.png";
import storeIcon from "../../assets/image/common/store.png";
import savingsIcon from "../../assets/image/common/saving.png";
import questIcon from "../../assets/image/common/quest.png";
import { BottomNavBar } from "../../components/nav-bar/BottomNavBar";

export const HomePage: React.FC = () => {
  const [isOpenParentCode, setIsOpenParentCode] = useState(false);
  const authStorage = localStorage.getItem("auth-storage");
  const authData = authStorage ? JSON.parse(authStorage) : null;
  const parentCode = authData?.state?.user?.parentCode;
  const { child, selectedChildId, setSelectedChildId } = useAuthStore();

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

      {/* 환영 문구 */}
      <div className="min-h-screen bg-base-300 font-SpoqaHanSansNeo scrollbar-hidden">
        <div
          className=" py-8.5 mx-auto max-w-md min-h-screen relative bg-cover bg-center bg-no-repeat scrollbar-hidden"
          style={{ backgroundImage: `url(${IMAGE_URLS.auth.bg})` }}
        >
          <div className="flex w-full px-6 mb-7">
            <div className="flex justify-between items-center gap-x-4.5">
              <PopoButton onClick={() => {}} />
              <div className="flex">
                <div className="flex flex-col font-bold text-lg">
                  <span className="">안녕하세요!</span>
                  <span className="-mt-1">부모님 환영합니다!</span>
                </div>
              </div>
            </div>
          </div>
          {/* 자녀 카드 */}
          <div className="flex pl-7 pr-7 flex-nowrap overflow-x-auto scrollbar-hidden gap-x-3 mb-4">
            {child.map((child: Child) => (
              <ChildCard
                key={child.userId}
                image={child.sex === "M" ? defaultChildBoyImage : defaultChildGirlImage}
                child={child}
                selected={selectedChildId === child.userId}
                setSelectedChildId={() => setSelectedChildId(child.userId)}
              />
            ))}
          </div>

          <div className="flex flex-col px-6">
            <AddButton text="자녀 추가 등록" onClick={() => setIsOpenParentCode(true)} className="mb-8" />

            {/* 설명  */}
            <div className="text-xl font-bold text-black mb-2">자녀와 함께 활동해보세요!</div>
            {/* 상단 타이틀 */}

            <div className="relative bg-white/75 rounded-lg mb-2 h-24 px-5 py-4">
              <div>
                <div className="text-base font-bold text-black">총 투자 분석 레포트!</div>
                <div className="text-sm text-main-gray-500">자녀의 모든 활동에 대한 분석을 받아보세요</div>
              </div>
              <img src={investIcon} alt="" className="absolute bottom-2 right-2 w-12.5" />
            </div>

            {/* 2x2 그리드 */}
            {/* prettier-ignore */}
            <div className="grid grid-cols-[5fr_3fr] gap-2 mb-12">
              <Link to="/invest/scenario-select" className="relative flex flex-col  h-28 bg-white/75 rounded-lg shadow py-3 px-4">
                <div className="text-base font-bold text-black">모의투자</div>   
                <div className="text-xs text-main-gray-500">모의투자 시나리오를 만들어보세요</div>
                <img src={popoStockIcon} alt="" className="absolute bottom-2 right-2 w-12.5" />
              </Link>
              <Link to="/store/product-management" className="relative flex flex-col h-28 bg-white/75 rounded-lg shadow py-3 px-3">
                <div className="text-base font-bold text-black">상점</div>
                <div className="text-xs text-main-gray-500">상품을 등록하고 내역을 확인하세요</div>
                <img src={storeIcon} alt="" className="absolute bottom-2 right-2 w-11.5" />
              </Link>
              <Link to="/savings/report" className="relative flex flex-col h-28 bg-white/75 rounded-lg shadow py-3 px-4">
                <div className="text-base font-bold text-black">저축통장</div>
                <div className="text-xs text-main-gray-500">자녀 저축통장 내역을 확인해보세요</div>
                <img src={savingsIcon} alt="" className="absolute bottom-2 right-2 w-11.5" />
              </Link>
              <Link to="/quest/create-quest" className="relative flex flex-col h-28 bg-white/75 rounded-lg shadow py-3 px-3">
                <div className="text-base font-bold text-black">퀘스트</div>
                <div className="text-xs text-main-gray-500">퀘스트를 등록하세요</div>
                <img src={questIcon} alt="" className="absolute bottom-2 right-2 w-11.5" />
              </Link>
            </div>
            {/* 분석 센터 화면 */}
            <h2 className="text-xl font-bold text-black mb-2">자녀의 금융 분석결과를 확인하세요!</h2>
            <Link to="/analyze" className="flex flex-col  w-full bg-white/75 rounded-3xl shadow py-4 px-3">
              <img src={analyzeCenter} alt="" className="w-full mb-2" />
              <div className="text-2xl font-bold text-black mb-1 ml-2">분석센터</div>
              <div className="flex gap-x-0.5">
                <div className="text-sm font-light px-3 py-1 bg-[#FFBF63] w-fit rounded-lg text-white ml-2">
                  모의투자
                </div>
                <div className="text-sm font-light px-3 py-1 bg-[#FFBF63] w-fit rounded-lg text-white ml-2">상점</div>
                <div className="text-sm font-light px-3 py-1 bg-[#FFBF63] w-fit rounded-lg text-white ml-2">퀘스트</div>
              </div>
            </Link>
            {/* 네비바 */}
          </div>
        </div>
        <BottomNavBar />
      </div>
    </>
  );
};
