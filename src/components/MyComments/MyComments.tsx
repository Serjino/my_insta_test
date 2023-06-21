'use client'
import { FormEvent, useEffect, useState } from 'react'
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { IComment } from '@/global/types';
import { Comment } from '../Comment/Comment';
import { CustomForm, IMyCommentsState, MyCommentsProps } from './types';
import { format } from 'date-fns';
import styles from './styles.module.css'

export function MyComments(props: MyCommentsProps) {

    const { comment, postId } = props

    const commentDraft: Partial<IComment> = {
        postId: postId,
        name: 'Sergey Kazarezov',
        email: 'serjino777@yandex.ru',
        body: ''
    }

    const [state, setState] = useState({
        inputMode: false,
        myComments: null
    } as IMyCommentsState)

    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem('myComments')!);
        savedComments && savedComments[postId] &&
            setState(prevState => ({
                ...prevState,
                myComments: savedComments ? savedComments[postId][comment.id] : null
            }))
    }, [])

    useDidMountEffect(() => {
        if (state.myComments) {
            let myComments = JSON.parse(localStorage.getItem('myComments')!) || {}
            myComments[postId] = {
                ...myComments[postId],
                [comment.id]: state.myComments
            }
            console.log(myComments)
            localStorage.setItem('myComments', JSON.stringify(myComments))
        }
    }, [state.myComments])

    function switchInputMode() {
        setState(prevState => ({
            ...prevState,
            inputMode: !prevState.inputMode
        }))
    }

    function submitMyComment(e: FormEvent<CustomForm>) {
        e.preventDefault()
        const target = e.currentTarget.elements
        const { myComment } = target

        let newComment = {
            ...commentDraft,
            id: Math.random(),
            body: myComment.value,
            dateTime: format(new Date(), 'dd.MM.yyyy HH:mm')
        } as IComment

        setState(prevState => ({
            ...prevState,
            myComments: [...[newComment], ...prevState.myComments || [],],
            inputMode: false
        }))
    }

    return (
        <div>
            {!state.inputMode &&
                <div
                    className={styles.leaveCommentBtn}
                    onClick={switchInputMode}
                >
                    Ответить
                </div>
            }
            <div className={styles.formWrapper}>
                {state.inputMode &&
                    <form
                        className={styles.form}
                        onSubmit={submitMyComment}
                    >
                        <textarea
                            name="myComment"
                            className={styles.input}
                            placeholder='Введите Ваш комментарий'
                        />
                        <button
                            className={styles.submitBtn}
                            type="submit"
                        >
                            Добавить
                        </button>
                    </form>
                }
            </div>
            <div className={styles.myCommentsListWrapper}>
                {state.myComments && state.myComments.map(myComment => {
                    return <Comment className={styles.myComment} comment={myComment} />
                })}
            </div>
        </div>
    )
}