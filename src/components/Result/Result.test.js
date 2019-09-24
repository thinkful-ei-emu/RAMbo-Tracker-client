import React from 'react';
import ReactDOM from 'react-dom';
import Result from './Result';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Result/>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});