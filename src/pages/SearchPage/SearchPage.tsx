import { FC } from "react";
import './SearchPage.css'
import {SearchBar} from "src/components/SearchBar";
import { CharacterSlider } from '../../components/CharacterList'

export const SearchPage: FC = () => {
    return (
    <div className='container searchpage-wrapper'>
        <h1 className='searchpage-title'>Search for your favorite characters right here!</h1>
        <SearchBar filterPosition="bottom"/>
        <CharacterSlider />
    </div>
    )
}