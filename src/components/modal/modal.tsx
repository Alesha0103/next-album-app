"use client";
import React from "react";
import { useRouter } from "next/navigation";

import styles from "./modal.module.scss";

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
      className={styles.overlay}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className={styles.wrapper}
      >
        {children}
      </div>
    </div>
  );
}