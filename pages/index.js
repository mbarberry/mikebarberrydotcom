import { useRef, useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Animation from '../components/Animation';
import Message from '../components/Message';

export default function Root() {
  const refContainer = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeoutID;
    if (!loading) {
      setShowMessage(true);
      timeoutID = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [loading]);

  return (
    <div
      style={{ height: '100vh', width: '100vw', position: 'relative' }}
      ref={refContainer}>
      {loading && <Loading />}
      {!loading && showMessage ? <Message /> : null}
      <Animation
        setLoading={setLoading}
        refContainer={refContainer}
      />
    </div>
  );
}
