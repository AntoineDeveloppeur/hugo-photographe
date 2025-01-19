import styles from './header-mobile.module.scss'
import LogoWithSignature from '../../molecules/LogoWithSignature/LogoWithSignature'
import MenuMobile from '@/components/ui/molecules/MenuMobile/MenuMobile'

const HeaderMobile = () => {
    return (
        <header className={styles.header}>
                <div
                    className={
                        styles.header__LogoWithSignatureWrapper
                    }
                >
                    <LogoWithSignature />
                </div>
                <div className={styles.header__MenuWrapper}>
                    <MenuMobile />
                </div>
        </header>
    )
}

export default HeaderMobile
