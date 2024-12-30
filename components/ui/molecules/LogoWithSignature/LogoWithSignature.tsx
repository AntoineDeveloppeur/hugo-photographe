import styles from './logo-with-signature.module.scss'
import Logo from '../../atoms/Logo/Logo'
import Signature from '../../atoms/Signature/Signature'
import Link from 'next/link'

export default function LogoWithSignature() {
    return (
        <Link className={styles.logoWithSignature} href="/">
            <Logo />
            <Signature />
        </Link>
    )
}
