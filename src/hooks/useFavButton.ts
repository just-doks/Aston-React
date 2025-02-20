import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToRemoveQueue, removeFromQueue, selectFavorite } from "src/store/favoriteSlice";
import { addFavorite, removeFavorite } from "src/store/favoriteSlice";
import { PATHS } from "src/utils/constants";
import type { CharacterSchema } from "src/http/characterTypes";

export function useFavButton(character?: CharacterSchema): [checked: boolean | null, handleFavChange: () => void] {
    const favorite = useSelector(selectFavorite);
    const dispatch = useDispatch();
    const location = useLocation();
    const [checked, setChecked] = 
        useState<boolean | null>(favorite.ids?.includes(character?.id) ?? null);
    useEffect(() => {
        if (!character || favorite.ids === null) return;
        if (location.pathname.includes(PATHS.CHARACTER) &&
            favorite.ids?.includes(character?.id)) {
                setChecked(!favorite.idsForRemoval?.includes(character?.id));
        } else
        if (location.pathname !== PATHS.FAVORITES)
            setChecked(favorite.ids?.includes(character?.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorite, character])
    
    function handleFavChange() {
        if (location.pathname === PATHS.FAVORITES || (
                location.pathname.includes(PATHS.CHARACTER) &&
                favorite.ids?.includes(character?.id) )
        ) {
            if (checked)
                dispatch(addToRemoveQueue(character?.id));
            else
                dispatch(removeFromQueue(character?.id));
            setChecked(!checked);
        } else 
        if (checked)
            dispatch(removeFavorite(character?.id));
        else
            dispatch(addFavorite(character?.id));
    }

    if (favorite.ids === null) return [null, () => {}];

    return [checked, handleFavChange];
}