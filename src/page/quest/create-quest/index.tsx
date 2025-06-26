import { useState } from "react";
import { uploadImageToCloudinary } from "../../../components/cloudinary/cloudinary";
import apiClient from "../../../api/api";
import { useAuthStore } from "../../../zustand/auth";
import { Modal } from "../../../components/modal/Modal";
import { CategoryDropdown } from "../../../features/quest/CategoryDropdown";
import { IMAGE_URLS } from "../../../constants/constants";

export const CreateQuestPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [label, setLabel] = useState("");
  const [reward, setReward] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputMissing, setIsInputMissing] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const { selectedChildId } = useAuthStore();

  const handleCreateQuest = async () => {
    if (!name || !description || !deadline || reward === "" || !label) {
      setIsInputMissing(true);
      return;
    }

    setIsLoading(true);

    let imageUrl: string | undefined;

    if (image) {
      const uploaded = await uploadImageToCloudinary(image);
      if (!uploaded) {
        alert("이미지 업로드 실패");
        setIsLoading(false);
        return;
      }
      imageUrl = uploaded;
    }

    const body = {
      childId: selectedChildId,
      name,
      description,
      reward: Number(reward),
      endDate: deadline,
      imageUrl,
      label,
    };

    console.log("요청바디", body);

    try {
      await apiClient.post("/api/quest/create", body);
      console.log("퀘스트 생성 성공:", body);

      setShowCompleteModal(true);

      setName("");
      setDescription("");
      setDeadline("");
      setReward("");
      setImage(null);
    } catch (err) {
      console.error("퀘스트 생성 실패:", err);
      alert("퀘스트 생성 실패 ㅠㅠ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded-3xl shadow-md border border-[#f2e9df]">
        {/* 라벨 선택 */}
        <CategoryDropdown selected={label} setSelected={setLabel} />

        {/* 제목 */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-800 mb-2 mt-3">제목</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 방 정리하기"
            className="w-full px-4 py-2 bg-[#fffdf9] text-base rounded-xl 
                       border border-gray-300
                       focus:border-[#ff8861] focus:outline-none focus:ring-0"
          />
        </div>

        {/* 설명 */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-800 mb-2">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="퀘스트에 대한 설명을 적어주세요!"
            rows={3}
            className="w-full px-4 py-2 bg-[#fffdf9] text-sm rounded-xl 
                       border border-gray-300 resize-none
                       focus:border-[#ff8861] focus:outline-none focus:ring-0"
          />
        </div>

        {/* 보상 */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-800 mb-2">보상 (냥)</label>
          <input
            type="number"
            min="0"
            value={reward}
            onChange={(e) => setReward(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="예: 100"
            className="w-full px-4 py-2 bg-[#fffdf9] text-base rounded-xl 
              border border-gray-300
              focus:border-[#ff8861] focus:outline-none focus:ring-0"
          />
        </div>

        {/* 사진 */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-800 mb-2">사진 (선택)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="w-full bg-[#fffdf9] rounded-xl text-base
              border border-gray-300
              focus:border-[#ff8861]focus:outline-none focus:ring-0
              file:bg-[#ff8861] file:text-white file:font-semibold file:rounded-md 
              file:border-none file:px-4 file:py-2 file:mr-4
               transition"
          />
        </div>

        {/* 마감 기한 */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-800">마감 기한</label>
          <input
            type="date"
            value={deadline}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 bg-[#fffdf9] rounded-xl mb-4
                       border border-gray-300
                       focus:border-[#ff8861] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="pt-2">
        <button
          onClick={handleCreateQuest}
          disabled={isLoading}
          className={`btn w-full font-bold py-6 rounded-xl text-lg transition-all shadow mt-4
            text-white ${isLoading ? "bg-orange-300" : "bg-[#ff8861] ]"}`}
        >
          {isLoading ? "업로드 중..." : "퀘스트 생성하기"}
        </button>
      </div>

      {/* 생성 제한 모달 */}
      {/* 퀘스트 생성 완료 모달 */}
      <Modal isOpen={isInputMissing} onClose={() => setIsInputMissing(false)}>
        <div
          className="bg-white w-80 rounded-3xl p-6 shadow-xl text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-8">모든 항목을 입력해주세요!</h2>

          <button
            onClick={() => setIsInputMissing(false)}
            className="w-full py-2 rounded-xl bg-[#ff8861] text-white font-semibold transition"
          >
            확인
          </button>

          {/* 닫기 버튼 (우측 상단) */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            onClick={() => setShowCompleteModal(false)}
          ></button>
        </div>
      </Modal>
      {/* 퀘스트 생성 완료 모달 */}
      <Modal isOpen={showCompleteModal} onClose={() => setShowCompleteModal(false)}>
        <div
          className="bg-white w-80 rounded-3xl p-6 shadow-xl text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="justify-center mb-1 flex">
            <img src={IMAGE_URLS.quest.popo} alt="포포" className="w-[5rem]" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">퀘스트 생성 완료!</h2>
          <p className="text-sm text-gray-600 mb-5">아이에게 새로운 퀘스트가 전달되었어요.</p>
          <button
            onClick={() => setShowCompleteModal(false)}
            className="w-full py-3 rounded-xl bg-[#ff8861] text-white font-semibold  transition"
          >
            확인
          </button>

          {/* 닫기 버튼 (우측 상단) */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            onClick={() => setShowCompleteModal(false)}
          >
            ×
          </button>
        </div>
      </Modal>
    </>
  );
};
