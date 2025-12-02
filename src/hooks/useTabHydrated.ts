import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useTabHydrated<T>(
  key: string,
  fallback: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = localStorage.getItem(key);

    if (stored) {
      setValue(stored as T);
    }
  }, [key]);

  return [value, setValue];
}
