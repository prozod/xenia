import React, { useEffect, useState } from "react";

export default function useOutside(ref: React.RefObject<HTMLElement>) {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(ev: any) {
      // button that handles the clicks needs to have the 'data-button' attribute
      if (
        !Boolean(ev?.target?.dataset.button) &&
        ref.current &&
        !ref.current.contains(ev?.target) &&
        isComponentVisible
      ) {
        setIsComponentVisible(!isComponentVisible);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, isComponentVisible, setIsComponentVisible]);

  return { isComponentVisible, setIsComponentVisible };
}
