
import { ReactComponent as ArrowSVG } from '#assets/arrowInCircle.svg';
import './ArrowButton.css';

type ArrowButtonProps = {
    direction: "left" | "right",
    onClick?: () => void
    className?: string,
}
export function ArrowButton({direction, onClick, className} : ArrowButtonProps) {
    return(
        <div 
            className={'arrow-btn' + ` arrow-btn-to-${direction}` + (
                className ? ` ${className}` : '')}
            onClick={onClick}
        >
            <ArrowSVG/>
        </div>
    )
}
