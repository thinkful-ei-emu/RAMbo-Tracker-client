import React from "react";
import ReactDOM from "react-dom";
import Symptom from "./Symptom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

const props = {
  prevSymptoms: ["a", "b", "c"]
};
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Symptom {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Symptom {...props} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
