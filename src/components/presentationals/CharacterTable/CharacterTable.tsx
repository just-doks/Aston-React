import { JSX } from 'react';
import { ArrowButton } from "#presentationals/ArrowButton";
import './CharacterTable.css';
import { ReactNode } from "react";

type CharacterTableProps = {
    prev: boolean,
    onPrevClick: () => void,
    next: boolean,
    onNextClick: () => void,
    children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[],
    className?: string
}

export function CharacterTable({
    prev, onPrevClick, next, onNextClick, children, className
}: CharacterTableProps) {
    return(
        <div className={"char-table-grid" + (className ? ` ${className}` : '')}>
            { prev && (
                <div className='char-table-btn-left'>
                    <ArrowButton direction='left' onClick={onPrevClick}/>
                </div>
            )}
            <div className="char-table">
                { children }
            </div>
            { next && (
                <div className='char-table-btn-right'>
                    <ArrowButton direction='right' onClick={onNextClick}/>
                </div>
            )}
        </div>
    )
}