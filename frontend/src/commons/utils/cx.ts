import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 *
 * extendTailwindMerge로 커스텀 클래스를 지원하고,
 * clsx로 조건부 클래스를 처리합니다.
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
 * @example
 * // 커스텀 Tailwind 클래스 지원
 * cx("display-xl", "text-primary")
 * // → "display-xl text-primary"
 *
 * @param inputs - 클래스 이름, 조건부 클래스, 객체 등
 * @returns 병합된 클래스 문자열
 */
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

export function cx(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Tailwind IntelliSense에서 클래스 정렬을 지원하기 위한 헬퍼 함수
 *
 * 이 함수는 실제로 아무 작업도 하지 않지만,
 * style 객체 내부의 클래스를 정렬할 수 있게 해줍니다.
 *
 * @example
 * const styles = sortCx({
 *   container: "flex items-center justify-between",
 *   button: "px-4 py-2 bg-blue-500 text-white",
 * });
 *
 * @param classes - 정렬할 클래스 객체
 * @returns 입력과 동일한 객체 (타입 안전성 유지)
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}
