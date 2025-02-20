import { Suspense, lazy, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeFavoritesFromQueue } from '#store/favoriteSlice'; 
import { useFuncOnUpdate } from '#hooks/useFuncOnUpdate';
import './FavPage.css';
const LazyMemoFavoritesTable = lazy(() => import('#containers/FavoritesTable').then(module => ({default: memo(module.FavoritesTable)})));

export function FavPage() {
    const dispatch = useDispatch();
    function removeFavorites() {
        dispatch(removeFavoritesFromQueue());
    }
    // const removeFavorites = useCallback(() => {
    //     dispatch(removeFavoritesFromQueue());
    // }, [])
    const favPageRef = useFuncOnUpdate<HTMLDivElement>(removeFavorites);
    
    return (
        <div className="container fav-page-wrapper" ref={favPageRef}>
            <h1 className='fav-page-title'>The collection of favorite characters</h1>
            <Suspense fallback={<h1 className="fav-page-title">LOADING...</h1>}>
                <LazyMemoFavoritesTable />
            </Suspense>
        </div>
    )
}