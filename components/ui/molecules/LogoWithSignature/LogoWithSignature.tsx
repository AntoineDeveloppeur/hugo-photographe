import Logo from '../../atoms/Logo/Logo'
import Signature from '../../atoms/Signature/Signature'
import styles from './logo-with-signature.module.scss'

export default function LogoWithSignature() {
    return (
        <div className={styles.logoWithSignature}>
            <Logo />
            <Signature />
        </div>
    )
}
