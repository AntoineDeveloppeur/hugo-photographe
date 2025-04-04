import Image from 'next/image'
// import logo from '@/public/logo.png'
import styles from './logo.module.scss'
import logo from '@/public/logo_test1.jpg'

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
