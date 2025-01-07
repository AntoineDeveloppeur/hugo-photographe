'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styles from './modalPhoto.module.scss'
import { ReactNode } from 'react'

interface ModalPhotoProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const ModalPhoto = ({ isOpen, onClose, children }: ModalPhotoProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContent}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className={styles.closeButton} onClick={onClose} aria-label='Close'>
                            ✕
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ModalPhoto
