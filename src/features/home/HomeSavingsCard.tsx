import React from "react";
import { Link } from "react-router-dom";
import whiteRightArrow from "../../assets/image/common/white-right-arrow.png";
import PopoImg from "../../assets/image/common/popo.png";

export const HomeSavingsCard: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col h-40 mb-5  mt-4 rounded-xl shadow-custom overflow-hidden">
        <Link to="/savings/report">
          <div className="bg-blue-700 w-full h-15 text-white text-lg flex items-center pl-5">
            저축통장
            <Link to="/savings/report" className="ml-58">
              <img
                src={whiteRightArrow}
                alt=""
                className="w-5 h-5 p-1 object-contain active:scale-90 transition-all duration-100"
              />
            </Link>
          </div>
          <div className="p-4 border-b border-gray-100">
            {/* 날짜 */}
            <div className="text-[0.7rem] text-gray-600 mb-1 ml-1">
              6월 25일
            </div>

            {/* 프로필, 이름, 금액 정보 */}
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-13 h-13 rounded-xl bg-blue-100 flex items-center justify-center">
                  <img src={PopoImg} alt="프로필" className="w-10 h-10" />
                </div>
                <div className="ml-3 text-[1rem] text-gray-800">이현</div>
              </div>

              {/* 금액 정보 */}
              <div className="text-right">
                <div className="text-[1.25rem] text-blue-600 font-medium">
                  +1000냥
                </div>
                <div className="text-[0.875rem] text-gray-500">
                  잔액: 12000냥
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
