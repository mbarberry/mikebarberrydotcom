import { useContext } from 'react';
import { PortalContext } from '../context/PortalContext';

export function PortalWrapper({ render }) {
  const client = useContext(PortalContext);
  return render(!!client);
}
