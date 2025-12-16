'use client'

import { useEffect, useRef, RefObject } from 'react'

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({ 
  threshold = 0.1,
  rootMargin = "0px"
}: ScrollRevealOptions = {}): RefObject<T> {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);
  
  return ref;
}

export default useScrollReveal;
