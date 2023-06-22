'use client'
import { ICommentProps } from './types'
import styles from './styles.module.css'

export function Comment({ comment, className }: ICommentProps) {

    return (
        <div className={styles.wrapper + ' ' + className}>
            <div className={styles.itemName}>
                {comment.name}
            </div>
            <div className={styles.body}>
                {comment.body}
            </div>
            {comment.dateTime &&
                <div className={styles.dateTime}>
                    {comment.dateTime}
                </div>
            }
        </div>
    )
}