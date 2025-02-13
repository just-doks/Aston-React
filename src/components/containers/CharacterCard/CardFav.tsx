
import { useFavButton } from "#hooks/useFavButton";
import { CharacterCard as View } from "#presentationals/CharacterCard";
import type { CharacterSchema } from "#http/characterTypes";

type CardFavProps = {
    character: CharacterSchema,
    name: string,
    imgUrl: string,
    navigateTo: string,
    isLoading?: boolean
}

export function CardFav({
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