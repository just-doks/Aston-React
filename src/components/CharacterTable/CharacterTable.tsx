
import { CharacterCard } from "src/components/CharacterCard";

import { type CharacterSchema } from "src/http/characterTypes"

import './CharacterTable.css';

type CharacterTableProps = {
    characters?: CharacterSchema[],
    className?: string
}

export function CharacterTable({characters = [], className} : CharacterTableProps) {

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