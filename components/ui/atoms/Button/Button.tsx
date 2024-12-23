'use client'

import { ButtonProps } from '@/types'

const Button = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => {}}>
            <p>{text}</p>
        </button>
    )
}

export default Button
