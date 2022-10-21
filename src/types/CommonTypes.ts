export interface UIPropsType {
  classes?: string;
  children?: string | React.ReactNode;
}
export type ColorModeType = 'light' | 'dark';

export interface RoomType {
  id: number;
  officeId: number;
  name: string;
  desciption: string;
  floor: number;
  maxPeople: number;
  minPeople: number;
  camera: boolean;
  tv: boolean;
  projector: boolean;
}
