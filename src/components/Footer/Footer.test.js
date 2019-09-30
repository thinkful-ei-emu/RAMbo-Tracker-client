import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Footer refreshesWhenAppStateDoes={() => {}} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Footer refreshesWhenAppStateDoes={() => {}} />
    </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
