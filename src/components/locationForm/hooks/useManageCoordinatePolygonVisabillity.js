import { GeometryTypes } from 'config';
import { useEffect } from 'react';
import { coordinatesField, polygonField } from '../definitions/FormFields';

function useManageCoordinatePolygonVisabillity({
  setVisible,
  watch,
  register,
  unregister,
}) {
  const coordOrPoly = watch('coord_or_poly');

  useEffect(() => {
    if (coordOrPoly === GeometryTypes.POINT) {
      setVisible((v) => ({
        ...v,
        stadsdeel: false,
        polygoon: false,
        coordinaten: true,
      }));

      register('coordinaten', coordinatesField.validation);

      unregister('polygoon');
    }

    if (coordOrPoly === GeometryTypes.POLYGON) {
      setVisible((v) => ({
        ...v,
        polygoon: true,
        coordinaten: false,
      }));

      register('polygoon', polygonField.validation);

      unregister('stadsdeel');
      unregister('coordinaten');
    }
  }, [coordOrPoly, register, setVisible, unregister]);
}

export default useManageCoordinatePolygonVisabillity;
