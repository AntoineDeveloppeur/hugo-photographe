import React from 'react'
import styles from './pagination.module.scss'
import ButtonArrow from '@/components/ui/atoms/ButtonArrow/ButtonArrow'

export default function Pagination({previousPage, nextPage, currentPage}: any) {
    return (
        <div
        className={
            styles.pagination
        }
    >
        <div
            className={
                styles.pagination__previous
            }
            onClick={(e) => {
                e.preventDefault();
                previousPage();
            }}
        >
            <ButtonArrow direction='left' />
        </div>
        <p
            className={
                styles.pagination__p
            }
        >
            {currentPage}
        </p>
        <div
            className={
                styles.pagination__next
            }
            onClick={(e) => {
                e.preventDefault();
                nextPage();
            }}
        >
            <ButtonArrow direction='right' />
        </div>
    </div>
    )
}