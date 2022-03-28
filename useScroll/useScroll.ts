import { useState, useEffect, useMemo } from "react";
import { throttle } from "lodash";

/**
 * 스크롤 커스텀 Hook 사용법
 * import {useScroll} from "../../../hooks/useScroll";
 *
 * const {scrollY} = useScroll();
 *
 * useEffect(() => {
 *    // scroll action
 * }, [scrollY]);
 */

/**
 * 스크롤 위치 Hook
 * -----------------------------------------------------------------------------------------------------------------
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  //##################################################################################################################
  //##
  //## >> Method : Private
  //##
  //##################################################################################################################

  /**
   * Scroll Listener
   * -----------------------------------------------------------------------------------------------------------------
   */
  const scrollListener = useMemo(
    () =>
      throttle(() => {
        setScrollY(window.scrollY);
      }, 150),
    [],
  );

  return { scrollY };
};
