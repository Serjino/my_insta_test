import { IComment, IPhoto } from '@/global/types'
import { GET } from '@/api/api'
import { Comment } from '@/components/Comment/Comment'
import { MyComments } from '@/components/MyComments/MyComments'
import { BackBtn } from '@/components/BackButton/BackButton'
import Image from 'next/image'
import styles from './page.module.css'

export default async function Page({ params }: { params: { postID: string } }) {

    const PHOTO: IPhoto[] = await GET({
        path: '/photos',
        query: {
            id: params.postID + ''
        }
    })

    const COMMENTS: IComment[] = await GET({
        path: '/comments',
        query: {
            postId: params.postID
        }
    })

    const targetPhoto = PHOTO[0]

    return (
        <div className={styles.page}>

            <div className={styles.titleWrapper}>
                <BackBtn />
                <h1>
                    {targetPhoto.title}
                </h1>
            </div>

            {!targetPhoto && <div style={{ backgroundColor: 'red' }}>Loading...</div>}

            {targetPhoto &&
                <div className={styles.photoFullSize}>
                    <Image src={targetPhoto.url + '.png'} alt={targetPhoto.title} fill />
                </div>
            }

            {!COMMENTS || COMMENTS.length == 0
                && <div className={styles.noComments}>
                    Пока нет комментариев
                </div>
            }
            {COMMENTS
                &&
                <div className={styles.commentsListWrapper}>
                    {COMMENTS?.map(comment => {
                        return (
                            <>
                                <Comment comment={comment} />
                                <MyComments
                                    postId={params.postID}
                                    comment={comment}
                                />
                            </>
                        )
                    })}
                </div>
            }

        </div>
    )
}