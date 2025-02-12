import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import './CharacterData.css';
import { type CharacterSchema } from 'src/http/characterTypes';
import { FavoriteButton } from '#presentationals/FavoriteButton';
import { useFavButton } from 'src/hooks/useFavButton';
import { useFuncOnUpdate } from 'src/hooks/useFuncOnUpdate';
import { removeFavoritesFromQueue } from 'src/store/favoriteSlice';
import { isAuth } from "#utils/selectors";
import { useImgLoad } from '#hooks/useImgLoad';
import { PlanetSpinner } from '#presentationals/PlanetSpinner';
import { fetchCharacter } from '#http/characterAPI';

export function CharacterData() {
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

    return(
        character && !loading && (
            <div className='c-page-grid' ref={charPageRef}>
                <div className='c-page-left-col'>
                    <div className='c-page-image-container'>
                        { isImgLoading ? (
                            <PlanetSpinner className='c-page-spinner'/>
                        ) : (
                            <img className='c-page-image' src={url}/>
                        )}
                    </div>             
                    { isUserAuth && checked !== null && (
                        <FavoriteButton 
                            className='c-page-fav' 
                            checked={checked}
                            onChange={handleFavChange}
                        />
                    )}
                </div>
                <div className='c-page-right-col'>
                    <ul className='c-page-info'>
                        <li><b>Name:</b> {character.name}</li>
                        <li><b>Status:</b> {character.status}</li>
                        <li><b>Species:</b> {character.species}</li>
                        <li><b>Type:</b> {character.type || '-'}</li>
                        <li><b>Gender:</b> {character.gender}</li>
                    </ul>
                </div>
            </div>
        ) || ( !character && !loading && (
            <div className='c-page-warning-badge'><h1>Character not found</h1></div>
        ))
    )
}