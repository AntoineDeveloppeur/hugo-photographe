import React from 'react'
import styles from './pagination.module.scss'
import ButtonArrow from '@/components/ui/atoms/ButtonArrow/ButtonArrow'

const Pagination = ({previousPage, nextPage, currentPage}: any) => {
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
            onClick={previousPage}
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
            onClick={nextPage}
        >
            <ButtonArrow direction='right' />
        </div>
    </div>
    )
}

export default Pagination