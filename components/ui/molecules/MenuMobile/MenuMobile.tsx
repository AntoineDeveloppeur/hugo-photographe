"use client"

import styles from './menu-mobile.module.scss'
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import IconPhone from '../../atoms/IconPhone/IconPhone'
import IconBook from '../../atoms/IconBook/IconBook'
import IconPortfolio from '../../atoms/IconPortfolio/IconPortfolio'     
import useDimensions from '@/hooks/useDimensions'
import Link from 'next/link'

export default function Variants() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { height } = useDimensions(containerRef)

    return (
            <div className={styles.container}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    className={styles.nav}
                >
                    <motion.div className={styles.background} variants={sidebarVariants} />
                    <motion.ul className={styles.list} variants={navVariants}>
                        <MenuItem text="Portfolio" icon="portfolio" link="/#Portfolio" />
                        <MenuItem text="Projets" icon="book" link="/#Projects" />
                        <MenuItem text="Contact" icon="phone" link="/#Contact" />
                    </motion.ul>
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
    )
}

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
}



const MenuItem = ({ text, icon, link }: { text: string, icon: string, link: string }) => {
    return (
        <motion.li
            // className={styles.listItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        ><Link href={link} className={styles.listItem}>

            {icon === 'portfolio' && <div className={styles.icon}><IconPortfolio /></div>}
            {icon === 'book' && <div className={styles.icon}><IconBook /></div>}
            {icon === 'phone' && <div className={styles.icon}><IconPhone /></div>}
            <div className={styles.text} >{text}</div>
        </Link>
        </motion.li>
    )
}

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
}

const sidebarVariants = {
    open: (height = 500) => ({
        clipPath: `circle(${height * 2 + 200}px at 220px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at 220px 40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="var(--color-text-main)"
        strokeWidth="3"
        stroke="var(--color-text-main)"
        strokeLinecap="round"
        {...props}
    />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <motion.div
        className={styles.toggleContainer}
        onClick={toggle}
    >
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </motion.div>
)


/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth
            dimensions.current.height = ref.current.offsetHeight
        }
    }, [ref])

    return dimensions.current
}