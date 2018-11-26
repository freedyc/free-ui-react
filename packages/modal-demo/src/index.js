import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ModalTest from './Components/ModalExample';
import ModalContentTest from './Components/ModalContentTest';
import CheckboxGroup from './Components/Checkbox';
import MultipleModal from './Components/MultipleModal';
import ReactModal from './Components/ReactModal';

const IndexComponent = () => {
  return (
    <div>
      <ModalTest />
      <CheckboxGroup />
      <ModalContentTest />
      <MultipleModal />
      <ReactModal />
    </div>
  )
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));

registerServiceWorker();
