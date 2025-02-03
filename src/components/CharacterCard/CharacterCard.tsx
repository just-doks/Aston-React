import { useState } from "react";
import { useNavigate } from "react-router";
import './CharacterCard.css';
import type { CharacterSchema } from "src/http/characterTypes";
import { PATHS } from "src/utils/constants";
import { StarButton } from "./StarButton";
import { PlanetSpinner } from "./PlanetSpinner";

export function CharacterCard({character}: 
    { character: CharacterSchema }
) {
    const [checked, setChecked] = useState<boolean>(false);
    const navigate = useNavigate();
    function handleLabelClick() {
        navigate(PATHS.CHARACTER, { state: {character: character}})
    }
    function handleStarChange() {
        setChecked(!checked)
    }

    return(
        <div className="c-card-container">
        { !character 
            ? <PlanetSpinner className="c-card-spinner"/>
            : <>
                <img className="c-card-image" src={character.image} alt="image"/>
                 <label className="c-card-label" onClick={handleLabelClick}>
                    <span>{character.name}</span>
                 </label>
                <StarButton 
                    className="c-card-fav" 
                    checked={checked} 
                    onChange={handleStarChange}
                />
              </>  
        }
        </div>
    )
}