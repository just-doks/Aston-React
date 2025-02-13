
import { CharacterSchema } from '#http/characterTypes';
import './CharacterInfo.css';

type CharacterInfoProps = {
    character: CharacterSchema,
    className?: string
}
export function CharacterInfo({character, className} : CharacterInfoProps) {
    return (
        <ul className={'character-info' + (className ? ` ${className}` : '')}>
            <li><b>Name:</b> {character.name}</li>
            <li><b>Status:</b> {character.status}</li>
            <li><b>Species:</b> {character.species}</li>
            <li><b>Type:</b> {character.type || '-'}</li>
            <li><b>Gender:</b> {character.gender}</li>
        </ul>
    )
}
