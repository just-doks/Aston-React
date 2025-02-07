import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import './CharacterCard.css';
import type { CharacterSchema } from "src/http/characterTypes";
import { PATHS } from "src/utils/constants";
import { StarButton } from "./StarButton";
import { PlanetSpinner } from "./PlanetSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addToRemoveQueue, removeFromQueue, selectFavorite } from "src/store/favoriteSlice";
import { addFavorite, removeFavorite } from "src/store/favoriteSlice";
type CharacterCardProps = {
    character: CharacterSchema
};

export function CharacterCard({character}: CharacterCardProps) {
    const favorite = useSelector(selectFavorite);
    const [checked, setChecked] = 
        useState<boolean>(favorite.ids.includes(character.id));
    
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== PATHS.FAVORITES)
            setChecked(favorite.ids.includes(character.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorite])
    
    function handleStarChange() {
        if (location.pathname === PATHS.FAVORITES) {
            if (checked)
                dispatch(addToRemoveQueue(character.id));
            else
                dispatch(removeFromQueue(character.id));
            setChecked(!checked);
        } else 
        if (checked)
            dispatch(removeFavorite(character.id));
        else
            dispatch(addFavorite(character.id));
    }

    return(
        <div className="c-card-container">
        { !character 
            ? <PlanetSpinner className="c-card-spinner"/>
            : <>
                <img className="c-card-image" src={character.image} alt="image"/>
                <Link 
                    className="c-card-link"
                    to={PATHS.CHARACTER} 
                    state={{character}}
                >
                    <span>{character.name}</span>
                 </Link>
                <StarButton 
                    className="c-card-fav" 
                    checked={checked} 
                    onChange={handleStarChange}
                />
              </>  
        }
        </div>
    )
}

function compareCharacters(prevProps: CharacterCardProps, nextProps: CharacterCardProps): boolean {
    for (let key in Object.keys(prevProps.character)) {
        if (prevProps.character[key] !== nextProps.character[key]) return false;
    }
    return true;
}

export const CharacterCardMemo = React.memo(CharacterCard, compareCharacters);