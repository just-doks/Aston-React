import { useEffect, useMemo, useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultipleCharacters } from 'src/http/characterAPI';
import { CharacterSchema } from 'src/http/characterTypes';
import { 
    removeFavoritesFromQueue, 
    selectIds
} from 'src/store/favoriteSlice';
import { CharacterCard } from '#containers/CharacterCard';
import { CharacterTable as CharacterTableView } from '#presentationals/CharacterTable';
import './FavoritesTable.css';

const MemoCharacterTable = memo(CharacterTableView)

const MemoCharacterCard = memo(CharacterCard)

export function FavoritesTable() {
    const favoriteIds: number[] = useSelector(selectIds);
    const dispatch = useDispatch();

    const [characters, setCharacters] = useState<CharacterSchema[]>([] as CharacterSchema[]);
    const [loading, setLoading] = useState(!!favoriteIds.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [prev, setPrev] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(favoriteIds.length > 20);

    useEffect(() => {
        if (!favoriteIds?.length) {
            return;
        }
        const allPages = Math.ceil(favoriteIds.length / 20);
        if (currentPage > allPages) {
            setCurrentPage(allPages);
            return;
        }
        const page = currentPage;
        const start = (page - 1) * 20;
        const end = (page -  1) * 20 + 20;
        const timeout = setTimeout(() => { setLoading(true) }, 600)
        fetchMultipleCharacters(favoriteIds.slice(start, end))
        .then(data => {
            setCharacters(data);
            setPrev(page > 1);
            setNext(page < allPages);
        })
        .catch(reason => { alert(reason) })
        .finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        })
    }, [favoriteIds, currentPage])


    const handlePrevClick = useCallback(() => {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage - 1);
    }, [currentPage])

    const handleNextClick = useCallback(() => {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage + 1);
    }, [currentPage])

    const MemoCharacterCards = useMemo(() => characters.map((c) => (
        <MemoCharacterCard key={c.id} character={c}/>
    )), [characters])

    return(
        loading ? (
            <h1 className="fav-table-warning">LOADING...</h1>
        ) : (
            <MemoCharacterTable
                prev={prev}
                onPrevClick={handlePrevClick}
                next={next}
                onNextClick={handleNextClick}
            >
                {MemoCharacterCards}
            </MemoCharacterTable>
        )
    )
}