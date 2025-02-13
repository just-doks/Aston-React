import { useContext } from "react";
import { useSelector } from "react-redux";
import type { CharacterSchema } from "#http/characterTypes";
import { PATHS } from "#utils/constants";
import { isAuth } from "#utils/selectors";
import { useImgLoad } from "#hooks/useImgLoad";
import { CharacterCard as View } from "#presentationals/CharacterCard";
import { CardFav } from "./CardFav";
import { getTelegramLink } from "#utils/getTelegramLink";
import { TelegramContext } from "src/App";

type CharacterCardProps = {
    character: CharacterSchema
};

export function CharacterCard({character}: CharacterCardProps) {
    const [url, isLoading] = useImgLoad(character.image);
    const authState = useSelector(isAuth);
    const { isTelegramShareEnabled } = useContext(TelegramContext);
    const path = PATHS.CHARACTER + `/${(character.id || '')}`;
    return(
        <>{ authState ? (
            <CardFav
                character={character}
                name={character.name}
                imgUrl={url}
                navigateTo={path}
                isLoading={isLoading}
                telegramEnabled={isTelegramShareEnabled}
                telegramHref={getTelegramLink(character)}
            />
        ) : (
            <View<CharacterSchema>
                character={character}
                name={character.name}
                imgUrl={url}
                navigateTo={path}
                isLoading={isLoading}
                favoriteDisabled
                telegramEnabled={isTelegramShareEnabled}
                telegramHref={getTelegramLink(character)}
            />
        )}</>
    )
}