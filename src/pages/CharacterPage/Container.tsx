import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { type CharacterSchema } from 'src/http/characterTypes';
import { useFavButton } from 'src/hooks/useFavButton';
import { useFuncOnUpdate } from 'src/hooks/useFuncOnUpdate';
import { removeFavoritesFromQueue } from 'src/store/favoriteSlice';
import { isAuth } from "#utils/selectors";
import { useImgLoad } from '#hooks/useImgLoad';
import { fetchCharacter } from '#http/characterAPI';
import { TelegramContext } from 'src/App';
import { View } from './View';

export function Container() {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const [character, setCharacter] = useState<CharacterSchema | undefined>(location?.state?.character);

    const [loading, setLoading] = useState((character ? false : true));

    const isUserAuth = useSelector(isAuth);
    const params = useParams();
    useEffect(() => {
        if (!character) {
            fetchCharacter(parseInt(params.id))
            .then((data) => {
                setCharacter(data);
            })
            .catch(() => {})
            .finally(() => { setLoading(false)})
        }
    }, [character, params])
    const [checked, handleFavChange] = useFavButton(character);

    function removeFavorites() {
        dispatch(removeFavoritesFromQueue());
    }
    const charPageRef = useFuncOnUpdate<HTMLDivElement>(removeFavorites);

    const [url, isImgLoading] = useImgLoad(character?.image);

    const { isTelegramShareEnabled } = useContext(TelegramContext);

    return (
        <View 
            character={character} 
            loading={loading} 
            ref={charPageRef}
            isImgLoading={isImgLoading}
            imgUrl={url}
            isUserAuth={isUserAuth}
            isFavorite={checked}
            onFavoriteChange={handleFavChange}
            isTelegramEnabled={isTelegramShareEnabled}
        />
    )
}