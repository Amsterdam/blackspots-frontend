import { useEffect } from 'react';

function useManageStadsdeelVisibillity({ setVisible, stadsdeel }) {
  useEffect(() => {
    setVisible((v) => ({
      ...v,
      stadsdeel: !!stadsdeel,
    }));
  }, [setVisible, stadsdeel]);
}

export default useManageStadsdeelVisibillity;
