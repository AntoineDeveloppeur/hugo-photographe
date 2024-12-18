import Logo from '../../atoms/Logo/Logo'
import Signature from '../../atoms/Signature/Signature'
import './logo-with-signature.module.scss'

export default function LogoWithSignature() {
    return (
        <div className="logo-with-signature">
            <Logo />
            <Signature />
        </div>
    )
}
