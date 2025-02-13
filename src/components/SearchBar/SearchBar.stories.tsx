import type { Meta, StoryObj } from '@storybook/react';
import {SearchBar} from './SearchBar.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { BrowserRouter } from 'react-router';
import '../../App.css'

const meta: Meta<typeof SearchBar> = {
    title: 'Components/Button',
    component: SearchBar,
    decorators: [
        (Story) => (
          <Provider store={store}>
            <BrowserRouter>
              <Story />
            </BrowserRouter>
          </Provider>
        ),
      ],
    args: {
      filterPosition: 'top', 
    },
  };
  export default meta;
  
  type Story = StoryObj<typeof SearchBar>;
  
  export const Primary: Story = {
    args: {
        filterPosition: 'top', 
    },
  };
  
  export const Secondary: Story = {
    args: {
        filterPosition: 'bottom', 
    },
}