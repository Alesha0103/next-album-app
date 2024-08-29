"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = React.useRef(null);
  const wrapper = React.useRef(null);
  const router = useRouter();

  const onDismiss = React.useCallback(() => {
    router.push("/");
  }, [router]);

  const onClick: React.MouseEventHandler = React.useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    </div>
  );
}