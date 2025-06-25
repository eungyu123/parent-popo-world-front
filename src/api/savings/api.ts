import apiClient from "../api";
import type { SavingsAccount, SavingsDeposit } from "./type";

interface SavingsAccountResponse extends SavingsAccount {
  deposits: Array<{
    depositAmount: number;
    depositDate: string;
    depositTime: string;
    accountPointAfter: number;
    childName: string;
    profileImage: string | null;
  }>;
}

// 자녀의 모든 저축통장 조회 (최신순)
export const fetchSavingsAccounts = async (
  childId: string
): Promise<SavingsAccount[]> => {
  try {
    const { data } = await apiClient.get<SavingsAccount[]>(
      `/api/parent/saving/child/${childId}/accounts`
    );
    return data;
  } catch (error) {
    console.error("저축통장 목록 조회 중 에러 발생:", error);
    throw error;
  }
};

// 저축 내역 조회
export const fetchSavingsDeposits = async (
  childId: string
): Promise<SavingsDeposit[]> => {
  try {
    const { data } = await apiClient.get<SavingsDeposit[]>(
      `/api/parent/saving/child/${childId}/deposits`
    );
    return data;
  } catch (error) {
    console.error("저축 내역 조회 중 에러 발생:", error);
    throw error;
  }
};
