import styles from "./header-mobile.module.scss"
import LogoWithSignature from "../../molecules/LogoWithSignature/LogoWithSignature"
import MenuMobile from "@/components/ui/molecules/MenuMobile/MenuMobile"

const HeaderMobile = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__LogoWithSignatureWrapper}>
        <LogoWithSignature />
      </div>
      {/* DeadSpace is used for Logo and Menu not to overlap */}
      <div className={styles.header__deadSpace}></div>
      <div className={styles.header__MenuWrapper}>
        <MenuMobile />
      </div>
    </header>
  )
}

export default HeaderMobile
