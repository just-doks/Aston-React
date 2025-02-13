import { CharacterSchema } from "#http/characterTypes";
import { useLocation } from "react-router";
import { PATHS } from "./constants";


export function getTelegramLink(character: CharacterSchema) {
    const url = `${window.location.host}${PATHS.CHARACTER}/${character.id}`;
    return `https://t.me/share/url?url=${url}&text=Rick%20and%20Morty:%20${character.name}`;
}