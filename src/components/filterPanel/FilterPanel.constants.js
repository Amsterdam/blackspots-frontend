export const ContextMenuOptions = {
  ALL: 'ALL',
  DELIVERED: 'DELIVERED',
  BLACKSPOTS: 'BLACKSPOTS',
  QUICKSCANS: 'QUICKSCANS',
  IVM: 'IVM',
};

export const MenuOptions = [
  {
    id: 1,
    label: 'Alles',
    value: ContextMenuOptions.ALL,
  },
  {
    id: 2,
    label: 'Opgeleverd in',
    value: ContextMenuOptions.DELIVERED,
  },
  {
    id: 3,
    label: 'Opgenomen als blackspot in',
    value: ContextMenuOptions.BLACKSPOTS,
  },
  {
    id: 4,
    label: 'Opgenomen als protocol in',
    value: ContextMenuOptions.QUICKSCANS,
  },
  {
    id: 5,
    label: 'Opgenomen in IVM lijst in',
    value: ContextMenuOptions.IVM,
  },
];
