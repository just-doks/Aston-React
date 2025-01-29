import './SearchPage.css'
import {Searchbar} from "../../components/Searchbar";
import { CharacterSlider } from '../../components/CharacterList'

export const SearchPage = () => {
    return (
    <div className='container searchpage-wrapper'>
        <h1 className='searchpage-title'>Search for your favorite characters right here!</h1>
        <Searchbar />
        <CharacterSlider/>
    </div>
    )
}