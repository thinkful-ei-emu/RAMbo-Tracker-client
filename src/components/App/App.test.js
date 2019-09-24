import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer';
//import ReactModal from "react-modal";

it("renders without crashing", () => {
  const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<BrowserRouter><App /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
