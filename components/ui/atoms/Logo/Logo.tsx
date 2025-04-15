import Image from 'next/image'
import styles from './logo.module.scss'
import logo from '@/public/logo-light.png'

const Logo = () => {
    return (
        <Image
            src={logo}
            alt="logo"
            placeholder="blur"
            className={styles.logo}
            priority
        />
    )
}

export default Logo
