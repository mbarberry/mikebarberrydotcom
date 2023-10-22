import { createContext, useRef } from 'react';

export const CacheContext = createContext(null);

export function CacheContextProvider({ children }) {
  const cachedBlogData = useRef({});
  const cachedBlogYear = useRef(null);
  const prevScrollY = useRef(0);
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
