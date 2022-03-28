import { useState } from "react";
import * as LocalStorage from "../constants/localStorage";

/**
 * 로컬 스토리지 커스텀 Hook 사용법
 * import {useLocalStorage} from "../../../hooks/useLocalStorage";
 *
 * const [scrollPosition, setScrollPosition] = useLocalStorage(LocalStorage.SCROLL_POSITION, 0);
 */

const LOCAL_STORAGE_SIZE_TEST: string = "local_storage_size_test";

/**
 * 로컬 스토리지 Hook
 * -----------------------------------------------------------------------------------------------------------------
 *
 * @param key : save Key
 * @param initialValue : save Value
 */
export const useLocalStorage = (key: string, initialValue: unknown) => {
  const [value, setValue] = useState(() => {
    return getStorage(key, initialValue);
  });

  const setStorageValue = (value: unknown) => {
    try {
      if (isStorageAvailable(JSON.stringify(value))) {
        LocalStorage.setStorage(key, JSON.stringify(value));
        setValue(value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [value, setStorageValue];
};

/**
 * 로컬 스토리지 사용 여부 체크 (용량 에러 예외처리)
 * -----------------------------------------------------------------------------------------------------------------
 *
 * @param value : save Template Value
 */
function isStorageAvailable(value: string) {
  try {
    LocalStorage.setStorage(LOCAL_STORAGE_SIZE_TEST, value);
    LocalStorage.remove(LOCAL_STORAGE_SIZE_TEST);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.name === "QUATA_EXCEEDED_ERR" || //### chrome
        e.name === "NS_ERROR_DOM_QUATA_REACHED" || //### Firefox/Safari
        localStorage.remainingSpace === 0) //### IE
    );
  }
}

/**
 * 로컬 스토리지 값 가져오기
 * -----------------------------------------------------------------------------------------------------------------
 *
 * @param key : get Key
 * @param initialValue : get Value
 */
export function getStorage(key: string, initialValue?: unknown) {
  if (typeof window !== "undefined") {
    const saved = LocalStorage.getStorage(key);
    return saved !== null && saved !== undefined ? JSON.parse(saved) : initialValue;
  }
}
