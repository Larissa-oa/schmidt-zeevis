/**
 * Lock body scroll when a modal/drawer is open.
 * Replaces duplicated useEffect logic in CartDrawer and CollectionPage.
 */
import { useEffect } from "react";

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
};
