import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ targetRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (targetRef?.current) {
      targetRef.current.scrollTo(0, 0);
    }
  }, [pathname, targetRef]);

  return null;
};

export default ScrollToTop;
