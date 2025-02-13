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

    const [currentPage, setCurrentPage] = useState(0);

    const [characters, setCharacters] = useState<CharacterSchema[]>([] as CharacterSchema[]);

    const [prev, setPrev] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!favorite.ids?.length) return;
        const allPages = Math.ceil(favorite.ids.length / 20);
        if (currentPage < 1) 
            setCurrentPage(1);
        else if (currentPage > allPages)
            setCurrentPage(allPages);
    }, [favorite])

    useEffect(() => {
        if (!favorite.ids?.length || !currentPage) return;
        setLoading(true);
        const allPages = Math.ceil(favorite.ids.length / 20);
        const page = (currentPage > allPages ? allPages : currentPage);
        const start = (page - 1) * 20;
        const end = (page -  1) * 20 + 20;

        fetchMultipleCharacters(favorite.ids.slice(start, end))
        .then(data => {
            setCharacters(data);
            setPrev(page > 1);
            setNext(page < allPages);
        })
        .catch(reason => alert(reason))
        .finally(() => {setLoading(false);})
    }, [currentPage])

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