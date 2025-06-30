import React from "react";
import { Link } from "react-router-dom";
import defaultChildBoyImage from "../../assets/image/common/boy.png";
import whiteRightArrow from "../../assets/image/common/white-right-arrow.png";

export const HomeQuestCard: React.FC = () => {
  return (
    <Link
      to="/quest/quest-list"
      className="w-full h-full shadow-custom rounded-xl active:scale-96 transition-all duration-150"
    >
      <div className="flex justify-between items-center text-lg text-white font-medium px-5 py-3 w-full bg-orange-400 rounded-t-xl">
        <span className="">퀘스트</span>
        <Link to="/quest/quest-list">
          <img
            src={whiteRightArrow}
            alt=""
            className="w-5 h-5 p-1 object-contain active:scale-90 transition-all duration-100"
          />
        </Link>
      </div>
      <div className="flex flex-col px-4 py-3.5 text-sm justify-between gap-y-2">
        <h4 className="">확인 요청</h4>
        <div className="flex justify-between items-center bg-gray-200 rounded-xl px-3 py-1.5">
          <div className="flex items-center gap-x-2">
            <img
              src={defaultChildBoyImage}
              alt=""
              className="w-6 h-6 object-contain"
            />
            <div className="text-xs">자녀1 님의 확인 요청</div>
          </div>
          <div className="text-xs">승인</div>
        </div>
        <div className="flex justify-between items-center bg-gray-200 rounded-xl px-3 py-1.5">
          <div className="flex items-center gap-x-2">
            <img
              src={defaultChildBoyImage}
              alt=""
              className="w-6 h-6 object-contain"
            />
            <div className="text-xs">자녀1 님의 확인 요청</div>
          </div>
          <div className="text-xs">승인</div>
        </div>
      </div>
    </Link>
  );
};
