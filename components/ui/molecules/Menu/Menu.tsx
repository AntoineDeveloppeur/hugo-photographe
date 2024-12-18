import './menu.scss'
import Link from 'next/link'

export default function () {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="#">
                        <p>PORTFOLIO</p>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <p>PROJETS</p>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <p>CONTACT</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
