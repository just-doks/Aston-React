import { useEffect, useMemo, useState, useCallback, memo, useRef } from 'react';
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
import { getTime } from '#utils/getTime';

const MemoCharacterTable = memo(CharacterTableView)

const MemoCharacterCard = memo(CharacterCard)

export function FavoritesTable() {
    console.log('favTable render: ' + getTime())
    const favoriteIds: number[] = useSelector(selectIds);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);

    const [characters, setCharacters] = useState<CharacterSchema[]>([] as CharacterSchema[]);

    const [prev, setPrev] = useState<boolean>(false);
    const [next, setNext] = useState<boolean>(false);

    const [loading, setLoading] = useState(true)

    let timeout = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        console.log('useEffect 1')
        console.log("length: ", favoriteIds?.length)
        if (!favoriteIds?.length) {
            timeout.current = timeout.current ?? setTimeout(() => {
                console.log("timeout");
                setLoading(false)
            }, 4000);
            return;
        }
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }

        const allPages = Math.ceil(favoriteIds.length / 20);
        if (currentPage < 1) 
            setCurrentPage(1);
        else if (currentPage > allPages)
            setCurrentPage(allPages);
    }, [favoriteIds])

    useEffect(() => {
        console.log('useEffect 2')
        if (!favoriteIds?.length || !currentPage) return;

        const allPages = Math.ceil(favoriteIds.length / 20);
        const page = (currentPage > allPages ? allPages : currentPage);
        const start = (page - 1) * 20;
        const end = (page -  1) * 20 + 20;

        fetchMultipleCharacters(favoriteIds.slice(start, end))
        .then(data => {
            setCharacters(data);
            setPrev(page > 1);
            setNext(page < allPages);
        })
        .catch(reason => alert(reason))
        .finally(() => {setLoading(false);})
    }, [currentPage])


    const handlePrevClick = useCallback(() => {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage - 1);
        setLoading(true);
    }, [currentPage])

    const handleNextClick = useCallback(() => {
        dispatch(removeFavoritesFromQueue());
        setCurrentPage(currentPage + 1);
        setLoading(true);
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