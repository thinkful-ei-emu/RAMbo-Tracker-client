import React from 'react';
import ReactDOM from 'react-dom';
import LoginRoute from './LoginRoute';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'
import LoginForm from '../../components/LoginForm/LoginForm'
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
it("renders the UI as expected", () => {
  const div = document.createElement('div')
  const wrapper = ReactDOM.render(<LoginForm />, div);
    const { inputRef } = wrapper.instance();

    jest.spyOn(inputRef.current, "focus");

    wrapper.instance().componentDidMount();
    expect(inputRef.current.focus).toHaveBeenCalledTimes(1);
 
 const tree = renderer.create(<BrowserRouter>
  <LoginRoute input={wrapper}/>
</BrowserRouter>)
 
   
  expect(tree).toMatchSnapshot();
});
