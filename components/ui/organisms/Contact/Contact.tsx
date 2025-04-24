'use client'

import styles from './contact.module.scss'
import { PhotoVariableProps} from '@/types/index'
import ButtonBig from '../../atoms/ButtonBig/ButtonBig'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import portraitHugo from '@/public/portrait-Hugo.jpg'
import Link from 'next/link'
import IconMail from '../../atoms/IconMail/IconMail'
import IconMap from '../../atoms/IconMap/IconMap'
import IconPhone from '../../atoms/IconPhone/IconPhone'
import { useRef, useContext } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import TitleProjectPage from '../../atoms/TitleProjectPage/TitleProjectPage'
import useReCaptcha from '@/hooks/useReCaptcha'
import { ShowPresentationContext } from '@/components/Providers'

export default function Contact() {

    const example : PhotoVariableProps = { src: portraitHugo.src, alt: 'Hugo Randez', width: 1943, height: 1880 }

    const { showPresentation, setShowPresentation } = useContext(ShowPresentationContext)

    const containerRef = useRef(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const transformedY = useTransform(
        scrollYProgress,
        [0.1, 1],
        [-130, 280]

    )

    const springY = useSpring(transformedY, {
        stiffness: 400,
        damping: 20,
        bounce: 0.1,
        mass: 0.5
    })

    // const { email, phone} = useReCaptcha()
    const email = "n'utilise pas le Recaptcha"
    const phone = "faux numéro"

    return (
        <section ref={containerRef} id="Contact" className={styles.contact}>
                {!showPresentation && (
                    <motion.div
                        style={{ 
                            y: springY,
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <ButtonBig 
                            text="DECOUVREZ LE PHOTOGRAPHE" 
                            onclick={() => setShowPresentation(true)} 
                        />
                    </motion.div>
                )}

                {showPresentation && (
                    <motion.div 
                        className={styles.contact__presentation}
                        initial={{ opacity: 0, x: '50vw' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.contact__presentation__photoWrapper}>
                            <PhotoBasic photo={example} sizes='250px'/>
                        </div>
                        <div className={styles.contact__presentation__text}>
                            <TitleProjectPage text="HUGO RANDEZ" />
                            <p className={styles.contact__presentation__text__p}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <div
                                className={styles.contact__presentation__text__details}
                            >
                                <IconPhone />
                                <Link
                                    href={`tel:${phone}`}
                                            className={
                                        styles.contact__presentation__text__details__link
                                            }
                                        >
                                    {phone}
                                </Link>
                            </div>
                            <div
                            className={styles.contact__presentation__text__details}
                            >
                                <IconMail />
                                <Link
                                    href={`mailto:${email}?subject=Demande%20d'information&body=Bonjour Hugo,%20je%20souhaite%20plus%20d'informations%20à%20propos%20de...`}
                                            className={
                                        styles.contact__presentation__text__details__link
                                            }
                                        >
                                    {email}
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
                    </motion.div>
                )}
        </section>
    )
}
