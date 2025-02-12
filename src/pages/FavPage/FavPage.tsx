import { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { removeFavoritesFromQueue } from '#store/favoriteSlice'; 
import { useFuncOnUpdate } from '#hooks/useFuncOnUpdate';
import './FavPage.css';

const FavoritesTable = lazy(() => import('#containers/FavoritesTable').then(module => ({default: module.FavoritesTable})));

export function FavPage() {
    const dispatch = useDispatch();
    const favPageRef = useFuncOnUpdate<HTMLDivElement>(removeFavorites);
    function removeFavorites() {
        dispatch(removeFavoritesFromQueue());
    }
    
    return (
        <div className="container fav-page-wrapper" ref={favPageRef}>
            <h1 className='fav-page-title'>The collection of favorite characters</h1>
            <Suspense fallback={<h1 className="fav-page-title">LOADING...</h1>}>
                <FavoritesTable />
            </Suspense>
        </div>
    )
}