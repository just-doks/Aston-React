import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FavPage.css';
import { CharacterTable } from 'src/components/CharacterTable';
import { fetchMultipleCharacters } from 'src/http/characterAPI';
import { CharacterSchema } from 'src/http/characterTypes';
import { 
    removeFavoritesFromQueue, 
    selectFavorite } from 'src/store/favoriteSlice'; 
import type { favoriteState } from 'src/store/favoriteSlice';

export function FavPage() {
    const favorite: favoriteState = useSelector(selectFavorite);
    const dispatch = useDispatch();

    const [ids, setIds] = useState<number[]>([]);

    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [characters, setCharacters] = useState<CharacterSchema[]>([] as CharacterSchema[]);

    const [prev, setPrev] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            dispatch(removeFavoritesFromQueue());
        }
    }, [])

    useEffect(() => {
        const _pages = Math.ceil(favorite.ids.length / 20);
        if (pages !== _pages)
            setPages(Math.ceil(favorite.ids.length / 20));
    }, [favorite])

    useEffect(() => {
        if (currentPage > pages)
            setCurrentPage(pages);
    }, [pages])

    useEffect(() => {
        const start = (currentPage - 1) * 20;
        const end = (currentPage -  1) * 20 + 20;
        setIds(favorite.ids.slice(start, end));

        setPrev(currentPage > 1);
        setNext(currentPage < pages);
    }, [currentPage, pages])

    useEffect(() => {
        fetchMultipleCharacters(ids)
        .then(data => {
            setCharacters(data);
        })
    }, [ids])

    function handleLeftClick() {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage - 1);
    }
    function handleRightClick() {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage + 1);
    }

    return(
        <div className="container fav-page-wrapper">
            <h1 className='fav-page-title'>The collection of favorite characters</h1>
            <CharacterTable 
                characters={characters}
                isLeft={prev}
                onLeftClick={handleLeftClick}
                isRight={next}
                onRightClick={handleRightClick}
            />
        </div>
    )
}