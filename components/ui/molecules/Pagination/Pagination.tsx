import React from 'react'
import styles from './pagination.module.scss'
import ButtonArrowRight from '@/components/ui/atoms/ButtonArrowRight/ButtonArrowRight'

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
            <ButtonArrowRight />
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
            <ButtonArrowRight />
        </div>
    </div>
    )
}

export default Pagination