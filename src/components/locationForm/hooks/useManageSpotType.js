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

    if (isBlackspotType(spotType) && !defaultValues.jaar_blackspotlijst) {
      setValue('jaar_blackspotlijst', year);
      setValue('jaar_ongeval_quickscan', '');
      setValue('jaar_opgenomen_in_ivm_lijst', '');
    }

    if (isProtocolType(spotType) && !defaultValues.jaar_ongeval_quickscan) {
      setValue('jaar_ongeval_quickscan', year);
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_opgenomen_in_ivm_lijst', '');
    }

    if (isIvmType(spotType) && !defaultValues.jaar_opgenomen_in_ivm_lijst) {
      setValue('jaar_opgenomen_in_ivm_lijst', year);
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', '');
    }

    if (
      !isBlackspotType(spotType) &&
      !isProtocolType(spotType) &&
      !isIvmType(spotType)
    ) {
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', '');
      setValue('jaar_opgenomen_in_ivm_lijst', '');
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
