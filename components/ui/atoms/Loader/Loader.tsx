'use client'

import Paragraphes from '../../molecules/Paragraphes/Paragraphes'
import styles from './loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Paragraphes texts={['Chargement de la photo en haute qualité']}/>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default Loader
