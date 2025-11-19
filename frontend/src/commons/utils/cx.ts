import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 *
 * clsx로 조건부 클래스를 처리하고,
 * tailwind-merge로 충돌하는 Tailwind 클래스를 병합합니다.
 *
 * @example
 * // 기본 사용
 * cx("bg-red-500", "text-white")
 * // → "bg-red-500 text-white"
 *
 * @example
 * // 조건부 클래스
 * cx("btn", isActive && "active", disabled && "disabled")
 * // → "btn active" (disabled가 false일 때)
 *
 * @example
 * // 충돌하는 클래스 병합
 * cx("p-4", "p-2")
 * // → "p-2" (나중 값이 우선)
 *
 * @param inputs - 클래스 이름, 조건부 클래스, 객체 등
 * @returns 병합된 클래스 문자열
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
