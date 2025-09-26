import styles from "./menu-item.module.scss"
import { motion } from "framer-motion"
import IconPhone from "../../atoms/IconPhone/IconPhone"
import IconBook from "../../atoms/IconBook/IconBook"
import IconPortfolio from "../../atoms/IconPortfolio/IconPortfolio"
import Link from "next/link"

export default function MenuItem({
  text,
  icon,
  link,
}: {
  text: string
  icon: string
  link: string
}) {
  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={link}
        className={styles.listItem}
      >
        {icon === "portfolio" && (
          <div className={styles.icon}>
            <IconPortfolio />
          </div>
        )}
        {icon === "book" && (
          <div className={styles.icon}>
            <IconBook />
          </div>
        )}
        {icon === "phone" && (
          <div className={styles.icon}>
            <IconPhone />
          </div>
        )}
        <div className={styles.text}>{text}</div>
      </Link>
    </motion.li>
  )
}

const itemVariants = {
  open: {
    display: "block",
    zIndex: 1,
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1, velocity: -100 },
    },
  },
  closed: {
    display: "none",
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1 },
    },
  },
}
