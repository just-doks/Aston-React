import { CharacterCard } from "src/components/CharacterCard";
import { type CharacterSchema } from "src/http/characterTypes";
import { ArrowButton } from "./ArrowButton";
import './CharacterTable.css';

type TableProps = {
    characters: CharacterSchema[],
    className?: string
}

type CharacterTableProps = {
    characters: CharacterSchema[],
    isLeft?: boolean,
    onLeftClick?: () => void,
    isRight?: boolean,
    onRightClick?: () => void,
    className?: string
}

export function Table({characters, className} : TableProps) {
    return(
        <div className={"char-table" + (className ? ` ${className}` : '')}>
            { characters.map((c) => (
                <div key={c.id} className='char-table-cell'>
                    <CharacterCard character={c}/> 
                </div>
            ))}
        </div>
    )
}

export function CharacterTable({
    characters = [] as CharacterSchema[],
    isLeft, onLeftClick, isRight, onRightClick,
    className
}: CharacterTableProps) {
    return(
        <div className={"char-table-grid" + (className ? ` ${className}` : '')}>
            { isLeft && (
                <div className='char-table-btn-left'>
                    <ArrowButton direction='left' onClick={onLeftClick}/>
                </div>
            )}
            <Table className="char-table-grid-mid" characters={characters}/>
            { isRight && (
                <div className='char-table-btn-right'>
                    <ArrowButton direction='right' onClick={onRightClick}/>
                </div>
            )}
        </div>
    )
}