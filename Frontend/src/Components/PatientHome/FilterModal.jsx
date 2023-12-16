import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


const FilterModal = ({ children, width = "", height = "" }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("FilterModal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  const modalStyle = {
    width,
    height,
  };

  return createPortal(<div style={modalStyle}>{children}</div>, elRef.current);
  //return createPortal(<div>{children}</div>, elRef.current);
};

export default FilterModal;
