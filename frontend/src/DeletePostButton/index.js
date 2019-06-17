import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'Modal';

import './index.scss';


function DeletePostButton({ deleteHandler, postId }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const deleteButtonHandler = useCallback(
    () => {
      setIsDisplayed(true);
    },
    [],
  );

  const cancelButtonHandler = useCallback(
    () => {
      setIsDisplayed(false);
    },
    [],
  );

  const commitButtonHandler = useCallback(
    () => {
      setIsDisplayed(false);
      deleteHandler(postId);
    },
    [deleteHandler, postId],
  );

  const renderModal = () => (
    <Modal key={postId}>
      <span>Are you sure you want to delete it?</span>
      <button className="delete-post-button__modal-button" onClick={commitButtonHandler}>I am sure</button>
      <button className="delete-post-button__modal-button" onClick={cancelButtonHandler}>Cancel</button>
    </Modal>
  );

  return (
    <>
      <button className="post-item__button" onClick={deleteButtonHandler}>Delete</button>
      {isDisplayed ? renderModal() : null}
    </>
  );
}

DeletePostButton.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

export default DeletePostButton;
