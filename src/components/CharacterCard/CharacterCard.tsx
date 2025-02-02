import { useState, JSX } from "react";
import { useNavigate } from "react-router";
import './CharacterCard.css';
import type { CharacterSchema } from "src/http/characterTypes";
import { PATHS } from "src/utils/constants";
import { StarButton } from "./StarButton";
import { PlanetSpinner } from "./PlanetSpinner";

export function CharacterCard({character = undefined}: { character: CharacterSchema }
): JSX.Element {
    const [checked, setChecked] = useState<boolean>(false);
    const navigate = useNavigate();
    function handleLabelClick() {
        navigate(PATHS.CHARACTER, { state: {character: character}})
    }

    return(
        <div className="c-card-container">
        { character === undefined 
            ? <PlanetSpinner className=" c-card-spinner"/>
            : <>
                <img className="c-card-image" src={character.image} alt="image"/>
                 <label className="c-card-label" onClick={handleLabelClick}>
                    <span>{character.name}</span>
                 </label>
                <StarButton 
                    className="c-card-fav" 
                    checked={checked} 
                    onChange={() => setChecked(!checked)}
                />
              </>  
        }
        </div>
    )
}