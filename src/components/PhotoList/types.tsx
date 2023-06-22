import { IPhoto } from '@/global/types';

export interface IPhotoListProps {
  data: IPhoto[] | null;
}

export interface IPaginationParams {
  offset: number;
  limit: number;
}
