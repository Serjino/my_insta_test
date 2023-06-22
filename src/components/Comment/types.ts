import { IComment } from '@/global/types';

export interface ICommentProps extends Partial<HTMLDivElement> {
  comment: IComment;
}
