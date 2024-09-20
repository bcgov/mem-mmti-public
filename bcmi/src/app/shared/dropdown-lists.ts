import { Constants } from './constants';

export interface DropdownOption {
  value: string | number;
  name: string;
}

export class DropdownLists {
  public static readonly MineTypeList: DropdownOption[] = [
    { value: '', name: 'All'},
    { value: 'Metal', name: Constants.MINE_TYPES.METAL},
    { value: 'Coal', name: Constants.MINE_TYPES.COAL},
    { value: 'Industrial Mineral', name: Constants.MINE_TYPES.INDUSTRIAL_MINERAL},
    { value: 'Sand & Gravel', name: Constants.MINE_TYPES.SAND_GRAVEL}
  ];

  public static readonly YesNoList: DropdownOption[] = [
    { value: '', name: 'Show All' },
    { value: 'yes', name: 'Yes' },
    { value: 'no', name: 'No'}
  ];
}
