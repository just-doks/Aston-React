
import { useFavButton } from "#hooks/useFavButton";
import { CharacterCard as View } from "#presentationals/CharacterCard";
import type { CharacterSchema } from "#http/characterTypes";
import { memo, useCallback } from "react";

const MemoView = memo(View<CharacterSchema>);

type CardFavProps = {
    character: CharacterSchema,
    name: string,
    imgUrl: string,
    navigateTo: string,
    isLoading?: boolean,
    telegramEnabled?: boolean,
    telegramHref?: string
}

export function CardFav({
    character, name, imgUrl, navigateTo, isLoading,
    telegramEnabled, telegramHref
}: CardFavProps) {
    const [checked, handleFavChange] = useFavButton(character);
    const memoHandleFavChange = useCallback(handleFavChange, [checked]);
    return (
        <MemoView
            character={character}
            name={name}
            imgUrl={imgUrl}
            navigateTo={navigateTo}
            isLoading={isLoading}
            isFavorite={checked}
            onFavoriteChange={memoHandleFavChange}
            telegramEnabled={telegramEnabled}
            telegramHref={telegramHref}
        />
    )
}