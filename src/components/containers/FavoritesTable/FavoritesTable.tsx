import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultipleCharacters } from 'src/http/characterAPI';
import { CharacterSchema } from 'src/http/characterTypes';
import { 
    removeFavoritesFromQueue, 
    selectFavorite 
} from 'src/store/favoriteSlice'; 
import type { favoriteState } from 'src/store/favoriteSlice';
import { CharacterCard } from '#containers/CharacterCard';
import { CharacterTable as CharacterTableView } from '#presentationals/CharacterTable';
import './FavoritesTable.css';

export function FavoritesTable() {
    const favorite: favoriteState = useSelector(selectFavorite);
    const dispatch = useDispatch();

    const [ids, setIds] = useState<number[]>([]);

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [characters, setCharacters] = useState<CharacterSchema[]>([] as CharacterSchema[]);

    const [prev, setPrev] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        if (!favorite.ids?.length) return;
        const _pages = Math.ceil(favorite.ids.length / 20);
        if (pages !== _pages) {
            setPages(_pages);
            if (currentPage < 1)
                setCurrentPage(1);
            else if (currentPage > pages)
                setCurrentPage(pages);
        }
    }, [favorite])

    useEffect(() => {
        if (!currentPage) return;
        const start = (currentPage - 1) * 20;
        const end = (currentPage -  1) * 20 + 20;
        setIds(favorite.ids.slice(start, end));
        setLoading(true);
    }, [currentPage, pages])

    useEffect(() => {
        if (!ids?.length) return;

        fetchMultipleCharacters(ids)
        .then(data => {
            setCharacters(data);

            setPrev(currentPage > 1);
            setNext(currentPage < pages);
            setLoading(false);
        })
    }, [ids])

    function handlePrevClick() {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage - 1);
    }
    function handleNextClick() {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage + 1);
    }

    return(
        loading ? (
            <h1 className="fav-table-warning">LOADING...</h1>
        ) : (
            <CharacterTableView
                prev={prev}
                onPrevClick={handlePrevClick}
                next={next}
                onNextClick={handleNextClick}
            >
                { characters.map((c) => (
                    <CharacterCard key={c.id} character={c}/>
                ))}
            </CharacterTableView>
        )
    )
}