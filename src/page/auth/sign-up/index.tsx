import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../api/api";

interface SignUpForm {
  email: string;
  password: string;
  name: string;
  sex: string;
  age: number | null;
  role: string;
  parentCode: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
  sex?: string;
  age?: string;
}

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    name: "",
    sex: "",
    age: null,
    role: "Parent",
    parentCode: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사 (8자 이상, 영문+숫자 조합)
  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
  };

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 이메일 검사
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다.";
    }

    // 이름 검사
    const name = formData.name.trim();
    const nameRegex = /^[가-힣]{2,}$/;

    if (!name) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "이름은 한글 2자 이상 입력해주세요.";
    }

    // 성별 검사
    if (!formData.sex) {
      newErrors.sex = "성별을 선택해주세요.";
    }

    // 나이 검사
    if (!formData.age) {
      newErrors.age = "나이를 입력해주세요.";
    } else if (formData.age < 20) {
      newErrors.age = "20세 이상만 가입 가능합니다.";
    } else if (formData.age > 120) {
      newErrors.age = "올바른 나이를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? parseInt(value) : null) : value,
    }));

    // 실시간 유효성 검사 (에러 메시지 제거)
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await apiClient.post("/auth/signup", formData);
      console.log(response.data);

      // 로그인 페이지로 이동
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-10 bg-white rounded-3xl mt-8 scrollbar-hidden">
        <h3 className="mb-6 text-2xl font-bold text-[#5E2B00] text-center">회원가입</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[#5E2B00] font-bold">이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-10 border rounded-lg p-2 ${errors.email ? "border-red-500" : "border-[#5E2B00]"}`}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#5E2B00] font-bold">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full h-10 border rounded-lg p-2 ${errors.password ? "border-red-500" : "border-[#5E2B00]"}`}
              placeholder="비밀번호를 입력해주세요 (8자 이상, 영문+숫자)"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#5E2B00] font-bold">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full h-10 border rounded-lg p-2 ${errors.name ? "border-red-500" : "border-[#5E2B00]"}`}
              placeholder="이름을 입력해주세요"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#5E2B00] font-bold">성별</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className={`w-full h-10 border rounded-lg p-2 ${errors.sex ? "border-red-500" : "border-[#5E2B00]"}`}
            >
              <option value="">성별을 선택해주세요</option>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
            {errors.sex && <span className="text-red-500 text-sm">{errors.sex}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#5E2B00] font-bold">나이</label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className={`w-full h-10 border rounded-lg p-2 ${errors.age ? "border-red-500" : "border-[#5E2B00]"}`}
              placeholder="나이를 입력해주세요 (20세 이상)"
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button
              type="submit"
              className="w-full h-10 bg-[#FFD905] text-white font-bold rounded-lg active:scale-95 transition-all duration-100"
            >
              가입하기
            </button>
            <Link to="/auth/sign-in">
              <button
                type="button"
                className="w-full h-10 bg-[#ADCF00] text-white font-bold rounded-lg active:scale-95 transition-all duration-100"
              >
                로그인으로 돌아가기
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
