import { useEffect, useRef, useState, RefObject } from "react";

interface ObserverOptions extends IntersectionObserverInit {}

export const UseFirstViewportEntry = (
    ref: RefObject<Element>,
    containerRef: RefObject<HTMLDivElement>,
    observerOptions?: ObserverOptions
  ): boolean => {
    const [entered, setEntered] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);
  
    useEffect(() => {
      const element = ref.current;
      const container = containerRef.current;
      const ob = observer.current;
  
   
  
      if (entered && ob) {
        ob.disconnect();
        return;
      }
  
      if (element && !entered && container) {
        const options: ObserverOptions = {
          root: container,
          rootMargin: '0px',
          threshold: 0.1,
          ...observerOptions
        };
        
        observer.current = new IntersectionObserver(
          ([entry]) => {
            console.log('Intersection Entry:', entry);
            setEntered(entry.isIntersecting);
          },
          options
        );
        observer.current.observe(element);

        console.log('Container Height:', container?.clientHeight);
        console.log('Element Top:', element?.getBoundingClientRect().top);
        console.log('Container Top:', container?.getBoundingClientRect().top);
        console.log('Element Bot:', element?.getBoundingClientRect().bottom);
        console.log('Container Bot:', container?.getBoundingClientRect().bottom);
      }
  
      return () => {
        if (ob) ob.disconnect();
      };
    }, [entered, ref.current, containerRef.current, observerOptions]);
  
    return entered;
  };
  