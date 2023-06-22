'use client'
import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { useDidMountEffect } from "@/hooks/useDidMountEffect"
import { IPhoto } from "../../global/types"
import { Photo } from "../Photo/Photo"
import { IPaginationParams, IPhotoListProps } from "./types"
import styles from './styles.module.css'

export function PhotoList(props: IPhotoListProps) {

    const { data } = props

    const PHOTOS_PER_PAGE = 21

    const ref = useRef() as RefObject<HTMLUListElement>

    const _pagination = JSON.parse(localStorage?.getItem('pagination')!) as IPaginationParams || null

    const [renderedPhotos, setRenderedPhotos] = useState<null | IPhoto[]>(null)

    const [pagination, setPagination] = useState<IPaginationParams>(_pagination || {
        offset: 0,
        limit: PHOTOS_PER_PAGE,
    })

    let timeout: NodeJS.Timeout

    useDidMountEffect(() => {
        localStorage.removeItem('openedPhoto')
        localStorage.removeItem('pagination')
    }, [renderedPhotos])

    useEffect(() => {
        const openedPhoto = localStorage?.getItem('openedPhoto')
        const doesUserCameFromPostPage = openedPhoto && _pagination
        const targetParams = doesUserCameFromPostPage ? { ..._pagination, offset: 0 } : pagination
        setRenderedPhotos(prevState => [...prevState || [], ...getNewSlice(targetParams)])
        
        return () => {
            localStorage.setItem('pagination', JSON.stringify(pagination))
        }
    }, [pagination])


    function getNewSlice(pagination: IPaginationParams) {
        return data!.slice(pagination.offset, pagination.limit) || []
    }

    const onScroll = useCallback((event: React.UIEvent) => {
        const { scrollTop, scrollHeight, offsetHeight } = (event.target as HTMLUListElement);
        const saveDistance = 10
        const scrollEdge = scrollHeight - offsetHeight;
        const breakPoint = scrollEdge - saveDistance
        console.log(breakPoint, scrollTop)
        if (scrollTop >= breakPoint) {
            setPagination(prevState => ({
                ...prevState,
                offset: prevState.offset + PHOTOS_PER_PAGE,
                limit: prevState.limit + PHOTOS_PER_PAGE,
                scrollTop: scrollTop
            }))
        }
    }, []);

    return (
        <>
            <ul
                ref={ref}
                onScroll={(e) => {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => onScroll(e), 200)
                }}
                className={styles.photoList}
            >
                {renderedPhotos?.map(photo => <Photo key={photo.id} photo={photo} />)}
            </ul>
        </>
    )
}