'use client'
import { FormEvent, useEffect, useState } from 'react'
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { IComment } from '@/global/types';
import { Comment } from '../Comment/Comment';
import { CustomForm, MyCommentsProps } from './types';
import { format } from 'date-fns';
import styles from './styles.module.css'

export function MyComments({ comment, postId }: MyCommentsProps) {

    const commentDraft: Partial<IComment> = {
        postId: postId,
        name: 'Sergey Kazarezov',
        email: 'serjino777@yandex.ru',
        body: ''
    }

    const [inputMode, setInputMode] = useState<boolean>(false)
    const [myComments, setMyComments] = useState<null | IComment[]>(null)

    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem('myComments')!);
        savedComments && savedComments[postId] &&
        setMyComments(prevState => savedComments ? savedComments[postId][comment.id] : null)
    }, [])

    useDidMountEffect(() => {
        if (myComments) {
            let storagedMyCommets = JSON.parse(localStorage.getItem('myComments')!) || {}
            storagedMyCommets[postId] = {
                ...storagedMyCommets[postId],
                [comment.id]: myComments
            }
            localStorage.setItem('myComments', JSON.stringify(storagedMyCommets))
        }
    }, [myComments])

    function switchInputMode() {
        setInputMode(prevState => !prevState)
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

        setMyComments(prevState => [...[newComment], ...prevState || [],])
        switchInputMode()
    }

    return (
        <div>
            {!inputMode &&
                <button
                    className={styles.leaveCommentBtn}
                    onClick={switchInputMode}
                >
                    Ответить
                </button>
            }
            <div className={styles.formWrapper}>
                {inputMode &&
                    <form
                        className={styles.form}
                        onSubmit={submitMyComment}
                    >
                        <textarea
                            name="myComment"
                            className={styles.input}
                            placeholder='Введите Ваш комментарий'
                        />
                        <div className={styles.btnPanel}>
                            <button
                                className={styles.formBtn}
                                type="submit"
                            >
                                Добавить
                            </button>
                            <button
                                className={styles.formBtn}
                                onClick={switchInputMode}
                            >
                                Отменить
                            </button>
                        </div>
                    </form>
                }
            </div>
            <div className={styles.myCommentsListWrapper}>
                {myComments && myComments.map(myComment => {
                    return <Comment key={myComment.id} className={styles.myComment} comment={myComment} />
                })}
            </div>
        </div>
    )
}