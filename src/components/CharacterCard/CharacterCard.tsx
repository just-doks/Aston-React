import { useState, JSX } from "react";
import { NavLink } from "react-router";
import './CharacterCard.css';
import type { CharacterSchema } from "src/http/characterTypes";
import { PATHS } from "src/utils/constants";
import { StarButton } from "./StarButton";
import { PlanetSpinner } from "./PlanetSpinner";

export function CharacterCard({character = undefined}: { character: CharacterSchema }
): JSX.Element {
    const [checked, setChecked] = useState<boolean>(false)

    return(
        <div className="c-card-container">
        { character === undefined 
            ? <PlanetSpinner className=" c-card-spinner"/>
            : <>
                <img className="c-card-image" src={character.image} alt="image"/>
                <NavLink className="c-card-navlink" to={PATHS.CHARACTER}>
                    <span>{character.name}</span>
                 </NavLink>
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