import React from 'react';
import ReactDOM from 'react-dom';
import AddFood from './AddFood';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddFood addFood={() => {}} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});