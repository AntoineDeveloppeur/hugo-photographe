import './logo.scss'
import Image from 'next/image'
import logo from '@/public/logo.png'

const Logo = () => {
    return <Image src={logo} alt="logo" placeholder="blur" />
}

export default Logo
