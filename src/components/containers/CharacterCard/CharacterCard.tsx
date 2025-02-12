
import { useSelector } from "react-redux";
import type { CharacterSchema } from "#http/characterTypes";
import { PATHS } from "#utils/constants";
import { isAuth } from "#utils/selectors";
import { useImgLoad } from "#hooks/useImgLoad";
import { CharacterCard as View } from "#presentationals/CharacterCard";
import { CardFav } from "./CardFav";

type CharacterCardProps = {
    character: CharacterSchema
};

export function CharacterCard({character}: CharacterCardProps) {
    const [url, isLoading] = useImgLoad(character.image);
    const authState = useSelector(isAuth);
    const path = PATHS.CHARACTER + `/${(character.id || '')}`;
    return(
        <>{ authState ? (
            <CardFav
                character={character}
                name={character.name}
                imgUrl={url}
                navigateTo={path}
                isLoading={isLoading}
            />
        ) : (
            <View<CharacterSchema>
                character={character}
                name={character.name}
                imgUrl={url}
                navigateTo={path}
                isLoading={isLoading}
                favoriteDisabled
            />
        )}</>
    )
}