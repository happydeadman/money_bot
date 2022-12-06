import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IReactPortal {
  children?: React.ReactNode;
  wraperId: string;
}

function createWrapper(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export function ReactPortal(props: IReactPortal) {
  const [wrapperElement, setWrapperElement] = useState<Element | null>(null);

  useEffect(() => {
    let element = document.querySelector("#modal_root");
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapper(props.wraperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [props.wraperId]);

  if (wrapperElement === null) return null;
  return ReactDOM.createPortal(props.children, wrapperElement);
}
