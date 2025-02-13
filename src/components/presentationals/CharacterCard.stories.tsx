import type { Meta, StoryObj } from "@storybook/react";
import { CharacterCard } from "./CharacterCard.tsx";
import { Provider } from "react-redux";
import { store } from "../../store/store.ts";
import { BrowserRouter } from "react-router";
import "../../App.css";
import { CharacterSchema } from "../../http/characterTypes.ts";

const characterMockUp: CharacterSchema = {
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  species: "Human",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  id: 1,
  status: "Alive",
  type: "Human",
  gender: "Male",
  created: "2017-11-10T12:23:13.668Z",
  url: "https://rickandmortyapi.com/api/character/1",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: "Citadel of Ricks",
};

const meta: Meta<typeof CharacterCard> = {
  title: "Components/Button",
  component: CharacterCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div style={{ width: "150px" }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  args: {
    character: characterMockUp,
  },
};
export default meta;

type Story = StoryObj<typeof CharacterCard>;

export const Default: Story = {};
