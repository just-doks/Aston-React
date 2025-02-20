
import { Link } from "react-router";
import './CharacterCard.css';
import { StarButton } from "#presentationals/StarButton";
import { PlanetSpinner } from "#presentationals/PlanetSpinner";
import { TelegramButton } from "#presentationals/TelegramButton";
import { getTime } from "#utils/getTime";

type CharacterCardProps<T> = {
    character: T,
    name: string
    imgUrl: string,
    navigateTo: string
    isLoading?: boolean,
    favoriteDisabled?: boolean,
    isFavorite?: boolean,
    onFavoriteChange?: () => void,
    telegramEnabled?: boolean,
    telegramHref?: string
};

export function CharacterCard<T>({
    character, name, imgUrl, navigateTo,
    favoriteDisabled, isLoading, isFavorite, onFavoriteChange,
    telegramEnabled, telegramHref
}: CharacterCardProps<T>) {
    console.log(`charCard ${name} render: ` + getTime() + `${imgUrl ? '' : ' no img'}`);
    return(
        <div className="c-card-container">
        { isLoading ? (
            <PlanetSpinner className="c-card-spinner"/>
        ) : (
            <>
                <img className="c-card-image" src={imgUrl} alt="image"/>
                <Link 
                    className="c-card-link"
                    to={navigateTo} 
                    state={{character}}
                >
                    <span>{name}</span>
                </Link>
                { !favoriteDisabled && (
                <StarButton 
                    className="c-card-fav" 
                    checked={isFavorite} 
                    onChange={onFavoriteChange}
                /> 
                )}
                { telegramEnabled && (
                    <TelegramButton href={telegramHref} className="c-card-tg"/>
                )}
            </>
        )}
        </div>
    )
}
