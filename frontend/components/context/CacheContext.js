import { createContext, useRef } from 'react';

export const CacheContext = createContext(null);

export function CacheContextProvider({ children }) {
  const cachedBlogData = useRef({});
  const cachedBlogYear = useRef(null);
  return (
    <CacheContext.Provider
      value={{ dataRef: cachedBlogData, yearRef: cachedBlogYear }}>
      {children}
    </CacheContext.Provider>
  );
}
