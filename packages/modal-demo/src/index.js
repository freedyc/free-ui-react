import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ModalTest from './Components/ModalExample';
import ModalContentTest from './Components/ModalContentTest';
import CheckboxGroup from './Components/Checkbox';
import MultiModalExample from './Components/MultiModalExample';
import ModalScroll from './Components/ModalScroll';

const IndexComponent = () => {
  return (
    <div>
      <ModalTest />
      <CheckboxGroup />
      <ModalContentTest />
      <MultiModalExample />
      <ModalScroll />
    </div>
  )
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));

registerServiceWorker();
