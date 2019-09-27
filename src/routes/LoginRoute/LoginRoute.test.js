import React from 'react';
import ReactDOM from 'react-dom';
import LoginRoute from './LoginRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'
it('renders without crashing', () => {
  
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoginRoute />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it('renders the UI as expected', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <LoginRoute onLoginSuccess={() => {}} />
      </BrowserRouter>,
      {
        createNodeMock: (element) => {
          if (element.type === 'input') {
            // mock a focus function
            return {
              focus: () => {
             /*    let focused = true; */
              }
            };
          }
          return null;
        }
      }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
