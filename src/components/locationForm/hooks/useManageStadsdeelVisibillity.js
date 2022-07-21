import { useEffect } from 'react';

function useManageStadsdeelVisibillity({ setVisible, stadsdeel }) {
  useEffect(() => {
    setVisible((v) => ({
      ...v,
      stadsdeel: true,
    }));
  }, [setVisible, stadsdeel]);
}

export default useManageStadsdeelVisibillity;
