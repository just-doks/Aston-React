import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useSelector } from "react-redux";
import './CharacterPage.css';
import { type CharacterSchema } from 'src/http/characterTypes';
import { PATHS } from 'src/utils/constants';
import { FavoriteButton } from '#presentationals/FavoriteButton';
import { useFavButton } from 'src/hooks/useFavButton';
import { useDispatch } from 'react-redux';
import { useFuncOnUpdate } from 'src/hooks/useFuncOnUpdate';
import { removeFavoritesFromQueue } from 'src/store/favoriteSlice';
import { isAuth } from "#utils/selectors";
import { useImgLoad } from '#hooks/useImgLoad';
import { PlanetSpinner } from '#presentationals/PlanetSpinner';

export function CharacterPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { character }: {character?: CharacterSchema} = location.state ?? {};
    const isUserAuth = useSelector(isAuth);
    const [checked, handleFavChange] = useFavButton(character);
    function removeFavorites() {
        dispatch(removeFavoritesFromQueue());
    }
    const charPageRef = useFuncOnUpdate<HTMLDivElement>(removeFavorites);
    const [url, isLoading] = useImgLoad(character.image);

    return(
        <> { character
            ?
            <div className='c-page-grid' ref={charPageRef}>
                <div className='c-page-left-col'>
                    { isLoading ? (
                        <div className='c-page-spinner-wrapper'>
                            <PlanetSpinner className='c-page-spinner'/>
                        </div>
                    ) : (
                        <img className='c-page-image' src={url}/>
                    )}                 
                    { isUserAuth && (
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
            :
            <Navigate to={PATHS.HOME}/>
        } </>
    )
}