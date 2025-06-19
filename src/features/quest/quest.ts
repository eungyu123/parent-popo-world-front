export interface Quest {
  quest_id: string;
  child_id: string;
  type: "parent" | "daily";
  name: string;
  description: string;
  state:
    | "수락 전"
    | "진행 중"
    | "확인 요청"
    | "지급 대기"
    | "지급 완료"
    | "기간 만료";
  end_date: string;
  created: string;
  isStatic: boolean;
  reward: number;
  imageUrl?: string;
  label: string;
}
