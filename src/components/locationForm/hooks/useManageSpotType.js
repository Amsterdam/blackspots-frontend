import { useEffect } from 'react';
import { GeometryTypes } from 'config';
import {
  isBlackspotType,
  isIvmType,
  isProtocolType,
  isStrictCoordinaatType,
  isStrictPolygoonType,
} from 'helpers';

export function useManageSpotType({
  spotType,
  setVisible,
  setValue,
  defaultValues,
}) {
  useEffect(() => {
    setVisible((v) => ({
      ...v,
      jaar_blackspotlijst: isBlackspotType(spotType),
      jaar_ongeval_quickscan: isProtocolType(spotType),
      jaar_opgenomen_in_ivm_lijst: isIvmType(spotType),
      coord_or_poly:
        !!spotType &&
        !isStrictCoordinaatType(spotType) &&
        !isStrictPolygoonType(spotType),
    }));

    if (isStrictPolygoonType(spotType) || isStrictCoordinaatType(spotType)) {
      setValue(
        'coord_or_poly',
        isStrictCoordinaatType(spotType)
          ? GeometryTypes.POINT
          : GeometryTypes.POLYGON
      );
    }

    const year = String(new Date().getFullYear());

    if (isBlackspotType(spotType)) {
      setValue(
        'jaar_blackspotlijst',
        defaultValues.jaar_blackspotlijst ?? year
      );
      setValue('jaar_ongeval_quickscan', null);
      setValue('jaar_opgenomen_in_ivm_lijst', null);
    }

    if (isProtocolType(spotType)) {
      setValue(
        'jaar_ongeval_quickscan',
        defaultValues.jaar_ongeval_quickscan ?? year
      );
      setValue('jaar_blackspotlijst', null);
      setValue('jaar_opgenomen_in_ivm_lijst', null);
    }

    if (isIvmType(spotType)) {
      setValue(
        'jaar_opgenomen_in_ivm_lijst',
        defaultValues.jaar_opgenomen_in_ivm_lijst ?? year
      );
      setValue('jaar_blackspotlijst', null);
      setValue('jaar_ongeval_quickscan', null);
    }

    if (
      !isBlackspotType(spotType) &&
      !isProtocolType(spotType) &&
      !isIvmType(spotType)
    ) {
      setValue('jaar_blackspotlijst', null);
      setValue('jaar_ongeval_quickscan', null);
      setValue('jaar_opgenomen_in_ivm_lijst', null);
    }
  }, [
    setVisible,
    spotType,
    defaultValues.jaar_blackspotlijst,
    defaultValues.jaar_ongeval_quickscan,
    defaultValues.jaar_opgenomen_in_ivm_lijst,
    setValue,
  ]);
}
