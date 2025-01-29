import "./CharacterSlider.css";
import { CharacterCard } from "./CharacterCard";
import { SvgButton } from "../../assets";
import { useState } from "react";
export const CharacterSlider = (props) => {
  const TEST = [
    [
      {
        id: 1,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 2,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 3,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 4,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 5,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 6,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 7,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 8,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ],
    [
      {
        id: 9,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 10,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 11,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 12,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 13,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 14,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 15,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 16,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    ],
  ];
  const [pageNumber, setPageNumber] = useState(0)
  
  const handlePreviousPage = () => {
      setPageNumber(pageNumber - 1)
  }
  const handleNextPage = () => {
    setPageNumber(pageNumber + 1)
}
  return (
    <div className="character-slider">
      <button className="character-slider_button-back" onClick={handlePreviousPage}>
        <SvgButton />
      </button>
      <ul className="character-slider_items">
        {TEST[pageNumber].map((character) => (
          <CharacterCard
            id={character.id}
            name={character.name}
            image={character.image}
          />
        ))}
      </ul>
      <button className="character-slider_button-forward" onClick={handleNextPage}>
        <SvgButton />
      </button>
    </div>
  );
};
