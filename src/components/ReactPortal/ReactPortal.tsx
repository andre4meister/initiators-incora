import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface ReactPortalProps {
  children: ReactNode;
  wrapperId?: string;
}
type ElementWrapperType = HTMLElement | null;

const ReactPortal = ({ children, wrapperId = 'root' }: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<ElementWrapperType>(null);

  useLayoutEffect(() => {
    const element: ElementWrapperType = document.getElementById(wrapperId);
    setWrapperElement(element);
  }, [wrapperId]);
  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
};

export default ReactPortal;
