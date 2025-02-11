
import { useSelector } from "react-redux";
import type { CharacterSchema } from "#http/characterTypes";
import { PATHS } from "#utils/constants";
import { isAuth } from "#utils/selectors";
import { useFavButton } from "#hooks/useFavButton";
import { useImgLoad } from "#hooks/useImgLoad";
import { CharacterCard as View } from "#presentationals/CharacterCard";

type CharacterCardProps = {
    character: CharacterSchema
};

type CardFavProps = {
    character: CharacterSchema,
    name: string,
    imgUrl: string,
    navigateTo: string,
    isLoading?: boolean
}

function CardFav({
    character, name, imgUrl, navigateTo, isLoading
}: CardFavProps) {
    const [checked, handleFavChange] = useFavButton(character);
    return (
        <View<CharacterSchema>
            character={character}
            name={name}
            imgUrl={imgUrl}
            navigateTo={navigateTo}
            isLoading={isLoading}
            isFavorite={checked}
            onFavoriteChange={handleFavChange}
        />
    )
}

export function CharacterCard({character}: CharacterCardProps) {
    const [url, isLoading] = useImgLoad(character.image);
    const authState = useSelector(isAuth);
    const path = PATHS.CHARACTER;
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