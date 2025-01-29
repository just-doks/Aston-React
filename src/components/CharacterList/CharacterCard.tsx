import "./CharacterCard.css";

export const CharacterCard: React.FC<{
  id: number;
  name: string;
  image: string;
}> = (props) => {
  return (
    <li
      className="character-card"
      style={{ backgroundImage: `url(${props.image})` }}
    >
        <h2 className="character-card_title">{props.name}</h2>
    </li>
  );
};
