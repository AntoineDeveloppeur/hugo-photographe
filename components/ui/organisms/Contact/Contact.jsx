import styles from './contact.module.scss'
import ButtonBig from '../../atoms/ButtonBig/ButtonBig'
import Photo from '../../atoms/Photo/Photo'
import voiture from '@/public/voiture.jpg'
import Title from '../../atoms/Title/Title'
import Link from 'next/link'
import IconMail from '../../atoms/IconMail/IconMail'
import IconMap from '../../atoms/IconMap/IconMap'
import IconPhone from '../../atoms/IconPhone/IconPhone'
const Contact = () => {
    const example = { src: voiture.src, alt: 'Voiture' }

    return (
        <section id="Contact" className={styles.contact}>
            <ButtonBig text="DECOUVREZ LE PHOTOGRAPHE" />
            <div className={styles.contact__presentation}>
                <div className={styles.contact__presentation__photoWrapper}>
                    <Photo photo={example} />
                </div>
                <div className={styles.contact__presentation__text}>
                    <Title text="HUGO RANDEZ" />
                    <p className={styles.contact__presentation__text__p}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliim veniam, quis nostrud exercitation ullamc
                    </p>
                    <div
                        className={styles.contact__presentation__text__details}
                    >
                        <IconPhone />
                        <Link
                            href="tel:+33644210716"
                            className={
                                styles.contact__presentation__text__details__link
                            }
                        >
                            06 44 21 07 16
                        </Link>
                    </div>
                    <div
                        className={styles.contact__presentation__text__details}
                    >
                        <IconMail />
                        <Link
                            href="mailto:hugo.randez@gmail.com?subject=Demande%20d'information&body=Bonjour Hugo,%20je%20souhaite%20plus%20d'informations%20à%20propos%20de..."
                            className={
                                styles.contact__presentation__text__details__link
                            }
                        >
                            hugo.randez@gmail.com
                        </Link>
                    </div>
                    <div
                        className={styles.contact__presentation__text__details}
                    >
                        <IconMap />
                        <Link
                            href="https://www.google.fr/maps/place/Fos-sur-Mer/@43.4545215,4.8155204,12z/data=!4m15!1m8!3m7!1s0x12b619721d5cf72d:0xea40197d819691d!2sFos-sur-Mer!3b1!8m2!3d43.437882!4d4.945711!16zL20vMDkxX3Zi!3m5!1s0x12b619721d5cf72d:0xea40197d819691d!8m2!3d43.437882!4d4.945711!16zL20vMDkxX3Zi!5m1!1e8?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            className={
                                styles.contact__presentation__text__details__link
                            }
                        >
                            Fos-sur-Mer (13)
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
