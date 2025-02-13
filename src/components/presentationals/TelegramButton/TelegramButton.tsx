
import { ReactComponent as TelegramSVG } from "#assets/tg-small-logo.svg";
import './TelegramButton.css';

type TelegramButtonProps = {
    href: string
    className?: string
}

export function TelegramButton({ href, className }: TelegramButtonProps) {
    return (
    <a 
        className={'tg-button' + (className ? ` ${className}` : '')}
        href={href}
        target='_blank'
    >
        <TelegramSVG/>
    </a>
)
}