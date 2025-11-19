"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Modal {
  id: string;
  content: ReactNode;
}

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([]);

  // 모달 열기 (중첩 지원)
  const openModal = useCallback((content: ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModals((prev) => [...prev, { id, content }]);
  }, []);

  // 가장 최근 모달 닫기
  const closeModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  // 모든 모달 닫기
  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  // body 스크롤 제어
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modals.length]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {typeof window !== "undefined" &&
        modals.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className="fixed inset-0 flex items-center justify-center"
              style={{ zIndex: 50 + index }}
              data-testid={`modal-overlay-${index}`}
            >
              {/* Backdrop - 각 모달마다 독립적으로 생성 */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={index === modals.length - 1 ? closeModal : undefined}
                aria-hidden="true"
                data-testid={`modal-backdrop-${index}`}
              />
              {/* Modal Content - max-w-md, w-full 제거됨 */}
              <div className="relative bg-white rounded-lg shadow-xl">
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )}
    </ModalContext.Provider>
  );
}
