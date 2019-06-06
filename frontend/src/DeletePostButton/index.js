import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal';

function DeletePostButton(props) {
    const { deleteHandler, postId } = props;

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

    const renderModal = (isDisplayed
        ? <Modal key={postId}>
            <span>Are you sure you want to delete it?</span>
            <button onClick={commitButtonHandler}>I am sure</button>
            <button onClick={cancelButtonHandler}>Cancel</button>
        </Modal>
        : null);

    return (
        <>
            <button className="post-item__button" onClick={deleteButtonHandler}>Delete</button>
            {renderModal}
        </>
    );
}

DeletePostButton.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
};

export default DeletePostButton;