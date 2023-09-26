import { createContext } from 'react';

export const MobileContext = createContext(null);

export function MobileContextProvider({ mobile, children }) {
  return (
    <MobileContext.Provider value={mobile}>{children}</MobileContext.Provider>
  );
}
