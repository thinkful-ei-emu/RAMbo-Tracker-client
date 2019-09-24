import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundRoute from './NotFoundRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NotFoundRoute />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders the UI as expected", () => {
  const tree = renderer
    .create(<BrowserRouter>
      <NotFoundRoute />
    </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});