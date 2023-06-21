import { RefObject, useEffect, useRef } from "react"
import { IPhotoProps } from "./types"
import Image from "next/image"
import Link from "next/link"
import styles from './styles.module.css'

export function Photo(props: IPhotoProps) {

    const { photo } = props

    const ref = useRef() as RefObject<HTMLLIElement>

    function setPostIdActive() {
        localStorage?.setItem('openedPhoto', JSON.stringify(photo))
    }

    useEffect(() => {
        const photoOpened = JSON.parse(localStorage?.getItem('openedPhoto')!)
        const pagination = localStorage?.getItem('pagination')
        pagination && photo!.id == photoOpened?.id && ref?.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }, [])


    return (
        photo &&
        <li
            ref={ref}
            className={styles.photoListItem}
            onClick={setPostIdActive}
        >
            <Link href={`/post/${photo.id}`}>
                <div className={styles.photoIdWrapper}>{photo.id}</div>
                <Image src={photo.thumbnailUrl} alt={photo.title} fill />
            </Link>
        </li>
    )
}