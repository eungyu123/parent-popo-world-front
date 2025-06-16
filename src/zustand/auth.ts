/**
 * 인증 관련 상태 관리를 위한 Zustand 스토어
 *
 * 이 스토어는 사용자의 인증 상태와 사용자 정보를 관리합니다.
 * localStorage에는 필요한 정보만 저장하고, 민감한 정보는 메모리에만 유지합니다.
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Child {
  name: string;
  sex: string;
  point: number;
  age: number;
  email: string;
  userId: string;
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean; // 인증 여부
  user: {
    name: string; // 이름
    parentCode: string; // 부모 코드
  } | null;
  child: Child[];
  parentCode: string | null;
  accessToken: string | null; // GitHub access token
  selectedChildId: string | null; // 선택된 자녀 ID
}

interface AuthStore extends AuthState {
  setUser: (user: AuthState["user"]) => void; // 유저 정보 설정
  logout: () => void; // 로그아웃
  setChildren: (child: Child[]) => void; // Child 설정
  setAccessToken: (token: string) => void; // Access Token 설정
  setSelectedChildId: (childId: string) => void; // 선택된 자녀 설정
}

/**
 * 초기 인증 상태
 * 앱 시작 시 또는 로그아웃 시 사용되는 기본값
 */
const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  parentCode: null,
  accessToken: null,
  child: [],
  selectedChildId: null,
};

/**
 * 인증 스토어 생성
 * persist 미들웨어를 사용하여 localStorage에 상태를 저장
 *
 * @returns {AuthStore} 인증 상태와 관련 액션들을 포함한 스토어
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      // 사용자 정보 설정 액션
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true, // 사용자 정보가 있으면 인증 상태를 true로 설정
        }),
      // 로그아웃 액션
      logout: () => set(INITIAL_AUTH_STATE),
      // Access Token 설정 액션
      setAccessToken: (token: string) => set({ accessToken: token }),
      // Child 설정 액션
      setChildren: (child: Child[]) => {
        set((state) => ({
          child,
          // 자녀 목록이 변경될 때 선택된 자녀가 없으면 첫 번째 자녀를 선택
          selectedChildId: state.selectedChildId || (child.length > 0 ? child[0].userId : null),
        }));
      },
      setSelectedChildId: (childId: string) => set({ selectedChildId: childId }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage를 스토리지로 사용
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        parentCode: state.parentCode,
        accessToken: state.accessToken,
        child: state.child,
        selectedChildId: state.selectedChildId,
      }),
    }
  )
);

// Zustand의 persist 미들웨어의 가장 핵심적인 장점은 "상태의 영속성(Persistence)을 자동으로 관리" 한다는 것입니다.
// 이게 무슨 의미냐면:
// 상태가 변경될 때마다 자동으로 localStorage에 저장
// 페이지 새로고침이나 브라우저 재시작 후에도 자동으로 이전 상태를 복원
// 이 모든 과정을 개발자가 직접 구현할 필요 없이 미들웨어가 알아서 처리
// 즉, "상태를 저장하고 복원하는 복잡한 로직을 직접 작성하지 않아도 된다"는 것이 가장 큰 장점입니다.
