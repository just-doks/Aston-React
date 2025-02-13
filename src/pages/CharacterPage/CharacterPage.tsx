import { Suspense, lazy } from "react";
import { useParams, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import './CharacterPage.css';
import { PATHS } from "#utils/constants.ts";
import { removeFavoritesFromQueue } from "#store/favoriteSlice.ts";
import { useFuncOnUpdate } from "#hooks/useFuncOnUpdate.ts";

const Container = lazy(() => import('./Container.tsx').then(module => ({default: module.Container})));

export function CharacterPage() {
    const dispatch = useDispatch();
    const id = parseInt(useParams()?.id);
    function removeFavorites() {
        dispatch(removeFavoritesFromQueue());
    }
    const charPageRef = useFuncOnUpdate<HTMLDivElement>(removeFavorites);
    return(
        ((isNaN(id)) ? (
            <Navigate to={PATHS.HOME}/>
        ) : (
            <div className="container" ref={charPageRef}>
                <Suspense fallback={<div className='c-page-warning-badge'><h1>LOADING...</h1></div>}>
                    <Container />
                </Suspense>
            </div>
        )
        )
    )
}