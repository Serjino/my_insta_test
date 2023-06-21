'use client'
import Image from "next/image"
import styles from './styles.module.css'
import arrowBack from '../../static/svg/arrowBack.svg'

export function BackBtn() {
    return (
        <button
            className={styles.backButton}
            onClick={(e) => history.go(-1)}
        >
            <Image src={arrowBack} alt={'back'} width={24} />
            Назад
        </button>
    )
}