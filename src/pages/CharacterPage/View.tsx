
import './View.css';
import { type CharacterSchema } from 'src/http/characterTypes';
import { FavoriteButton } from '#presentationals/FavoriteButton';
import { PlanetSpinner } from '#presentationals/PlanetSpinner';
import { ShareButton } from '#presentationals/ShareButton';
import { CharacterInfo } from '#presentationals/CharacterInfo';
import { getTelegramLink } from '#utils/getTelegramLink';

type ViewType = {
    character: CharacterSchema, 
    loading: boolean, 
    ref: React.Ref<HTMLDivElement>, 
    isImgLoading: boolean, 
    imgUrl: string | null, 
    isUserAuth: boolean, 
    isFavorite: boolean | null, 
    onFavoriteChange: () => void, 
    isTelegramEnabled: boolean
}

export function View({character, loading, ref, isImgLoading, imgUrl, 
    isUserAuth, isFavorite, onFavoriteChange, isTelegramEnabled
}: ViewType) {

    return(
        character && !loading && (
            <div className='c-page-grid' ref={ref}>
                <div className='c-page-left-col'>
                    <div className='c-page-image-container'>
                        { isImgLoading ? (
                            <PlanetSpinner className='c-page-spinner'/>
                        ) : (
                            <img className='c-page-image' src={imgUrl}/>
                        )}
                    </div>             
                    { isUserAuth && isFavorite !== null && (
                        <FavoriteButton 
                            className='c-page-fav' 
                            checked={isFavorite}
                            onChange={onFavoriteChange}
                        />
                    )}
                    { isTelegramEnabled && (
                        <ShareButton className='c-page-tg' href={getTelegramLink(character)}/>
                    )}
                </div>
                <div className='c-page-right-col'>
                    <CharacterInfo character={character}/>
                </div>
            </div>
        ) || ( !character && !loading && (
            <div className='c-page-warning-badge'><h1>Character not found</h1></div>
        ))
    )
}