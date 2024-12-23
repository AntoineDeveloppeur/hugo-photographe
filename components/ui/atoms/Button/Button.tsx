import { ButtonProps } from '@/types'

const Button = ({ text, icon }: ButtonProps) => {
    return (
        <button onClick={() => {}}>
            <p>{text}</p>
            {icon}
        </button>
    )
}

export default Button
