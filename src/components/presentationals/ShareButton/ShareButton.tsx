
import { ReactComponent as TelegramSVG} from '#assets/icon-telegram.svg';
import './ShareButton.css';

type ShareButtonProps = {
    href: string,
    className?: string
}

export function ShareButton({href, className}: ShareButtonProps) {
    return (
        <a 
            className={'share-button' + (className ? ` ${className}` : '')}
            href={href}
            target="_blank"
        >
            <label>Share</label>
            <TelegramSVG/>
        </a>
    )
}