import React from 'react';
import ReactDOM from 'react-dom';
import Symptom from './Symptom';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Symptom  />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});