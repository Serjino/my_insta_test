'use client'
import Image from "next/image"
import styles from './styles.module.css'
import arrowBack from '../../static/svg/arrowBack.svg'
import { useRouter } from 'next/navigation'

export function BackBtn() {

    const router = useRouter()

    return (
        <button
            className={styles.backButton}
            onClick={(e) => router?.back()}
        >
            <Image src={arrowBack} alt={'back'} width={24} />
            Назад
        </button>
    )
}