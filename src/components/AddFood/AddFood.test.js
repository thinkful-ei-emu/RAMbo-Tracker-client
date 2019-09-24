import React from 'react';
import ReactDOM from 'react-dom';
import AddFood from './AddFood';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

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

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<AddFood addFood={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
