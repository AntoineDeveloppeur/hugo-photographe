import styles from './icon-arrow-left.module.scss'

const IconArrowRight = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-pagination)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles['feather-arrow-right']}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    )
}

export default IconArrowRight
