import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ModalTest from './Components/ModalExample';
import ModalContentTest from './Components/ModalContentTest';
import CheckboxGroup from './Components/Checkbox';

const IndexComponent = () => {
  return (
    <div>
      <ModalTest />
      <CheckboxGroup />
      <ModalContentTest />
    </div>
  )
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));

registerServiceWorker();
