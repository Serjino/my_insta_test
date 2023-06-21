import { IComment } from "@/global/types";

export interface MyCommentsProps {
    postId: number | string,
    comment: IComment
}

export interface CustomElements extends HTMLFormControlsCollection {
    myComment: HTMLTextAreaElement;
}

export interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

export interface IMyCommentsState {
    inputMode: boolean,
    myComments: null | IComment[]
}
