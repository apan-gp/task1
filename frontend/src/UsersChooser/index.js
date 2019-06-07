import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'

function UsersChooser(props) {
    return (
        <div className={props.className}>
            <label>Users</label>
            <div className="users-chooser">
                {renderUserRadios(props.formName, props.users, props.changeHandler, props.defaultValue)}
            </div>
        </div>
    );
}

/// @param users object: {string name, number id}
function renderUserRadios(formName, users, changeHandler, defaultValue) {
    return users.map(user => (
        <span className="users-chooser__entry" key={user.id}>
            <input type="radio" name={formName} value={user.id} onChange={changeHandler}
             checked={user.id === defaultValue} />
                {user.name}
        </span>
    ));
}

UsersChooser.propTypes = {
    changeHandler: PropTypes.func.isRequired, // function's param: event
    className: PropTypes.string,
    defaultValue: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    formName: PropTypes.string.isRequired,
};

export default UsersChooser;