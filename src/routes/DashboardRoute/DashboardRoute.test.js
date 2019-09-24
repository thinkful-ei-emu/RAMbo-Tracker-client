import React from 'react';
import ReactDOM from 'react-dom';
import DashboardRoute from './DashboardRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DashboardRoute />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders the UI as expected", () => {
  const tree = renderer
    .create(<BrowserRouter>
      <DashboardRoute />
    </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});