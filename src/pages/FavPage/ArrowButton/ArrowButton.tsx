
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
            <svg viewBox="0 0 330 330">
                <path d="M175.605,104.393c-2.814-2.813-6.628-4.393-10.607-4.393c-3.979,0-7.794,1.581-10.607,4.394l-79.998,80
                    c-5.857,5.858-5.857,15.355,0.001,21.213c5.857,5.857,15.355,5.858,21.213-0.001l69.392-69.393l69.395,69.394
                    C237.322,208.536,241.161,210,245,210s7.678-1.464,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L175.605,104.393z"/>
                <path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300
                    c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"/>
            </svg>
        </div>
    )
}
