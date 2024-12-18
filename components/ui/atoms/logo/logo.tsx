import './logo.css'
import Image from 'next/image'
import logo from '@/public/logo.png'

export default function Logo() {
    return <Image src={logo} alt="logo" placeholder="blur" />
}
