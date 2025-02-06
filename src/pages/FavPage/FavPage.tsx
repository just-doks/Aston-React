

import { useEffect, useState } from 'react';
import { ArrowButton } from './ArrowButton';
import './FavPage.css';
import { CharacterTable } from 'src/components/CharacterTable';
import { fetchAllCharacters, fetchCharacterPage } from 'src/http/characterAPI';
import { CharacterSchema } from 'src/http/characterTypes';

export function FavPage() {
    const [characters, setCharacters] = useState<CharacterSchema[]>([]);
    const [prev, setPrev] = useState<string>(null);
    const [next, setNext] = useState<string>(null);
    useEffect(() => {
        fetchAllCharacters()
        .then((data) => {
            setCharacters(data.results);
            if (data.info.next) {
                console.log(data.info.next)
                setNext(data.info.next);
            }
            if (data.info.prev) {
                console.log(data.info.prev)
                setPrev(data.info.prev);
            }
        })
    }, [])
    function handleBtnClick(page) {
        return () => {
            fetchCharacterPage(page)
            .then((data) => {
                setCharacters(data.results);
                setNext(data.info.next);
                setPrev(data.info.prev);
            })
        }
    }

    return(
        <div className="container fav-page-wrapper">
            <h1 className='fav-page-title'>The collection of favorite characters</h1>
            <div className='fav-page-table'>
                { prev && (
                    <div className='fav-page-btn-left'>
                        <ArrowButton direction='left' onClick={handleBtnClick(prev)}/>
                    </div>
                )}
                <CharacterTable className="fav-page-mid" characters={characters.slice(0, 20)}/>
                { next && (
                    <div className='fav-page-btn-right'>
                        <ArrowButton direction='right' onClick={handleBtnClick(next)}/>
                    </div>
                )}
            </div>
        </div>
    )
}