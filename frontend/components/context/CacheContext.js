import { createContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

export const CacheContext = createContext(null);

export function CacheContextProvider({ children }) {
  const cachedBlogData = useRef({});
  const cachedBlogYear = useRef(null);
  const prevScrollY = useRef(0);

  const router = useRouter();

  useEffect(() => {
    // Reset location to top when user
    // navigates away from blog.
    if (!router.pathname.includes('blog')) {
      prevScrollY.current = 0;
    }
  }, [router.pathname]);

  return (
    <CacheContext.Provider
      value={{
        dataRef: cachedBlogData,
        yearRef: cachedBlogYear,
        scrollRef: prevScrollY,
      }}>
      {children}
    </CacheContext.Provider>
  );
}
