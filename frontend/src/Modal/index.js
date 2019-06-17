import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


function Modal({ children }) {
  return (
    <div className="modal__background">
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
