import styles from './logo-with-signature.module.scss'
import Signature from '../../atoms/Signature/Signature'
import Link from 'next/link'
import LogoSvg from '../../atoms/LogoSvg/LogoSvg'

const LogoWithSignature = () => {
    return (
        <Link className={styles.logoWithSignature} href="/">
            <LogoSvg/>
            <Signature />
        </Link>
    )
}

export default LogoWithSignature
