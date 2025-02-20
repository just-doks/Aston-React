
import { SearchBar } from "src/components/SearchBar";
import { SearchErrorBoundary } from "../../components/ErrorBoundary/SearchErrorBoundary";
import { CharacterSlider } from "src/components/CharacterList";

export function Page() {

    return (
        <SearchErrorBoundary>
            <SearchBar filterPosition="bottom" />
            <CharacterSlider/>
        </SearchErrorBoundary>
    )
}