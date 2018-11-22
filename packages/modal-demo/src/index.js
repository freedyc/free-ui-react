import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ModalTest from './Components/ModalExample';
import CheckboxGroup from './Components/Checkbox';

const IndexComponent = () => {
  return (
    <div>
      <ModalTest />
      <CheckboxGroup />
    </div>
  )
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));

registerServiceWorker();
