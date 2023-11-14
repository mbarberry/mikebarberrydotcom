import { createContext } from 'react';

export const PortalContext = createContext(null);

export function PortalContextProvider({ client, children }) {
  return (
    <PortalContext.Provider value={client}>{children}</PortalContext.Provider>
  );
}
