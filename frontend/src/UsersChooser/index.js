import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'

function UsersChooser(props) {
    return (
        <form className="users-chooser">
            {generateUserRadios(props.uniqueName, props.users, props.changeHandler, props.defaultValue)}
        </form>
    );
}

/// @param users object: {string name, number id}
function generateUserRadios(groupName, users, changeHandler, defaultValue) {
    //return users.map(user => <option value={user.id} key={user.id}>{user.name}</option>);
    return users.map(user => (
        <span className="users-chooser__entry" key={user.id}>
            <input type="radio" name={groupName} value={user.id} key={user.id} onChange={changeHandler}
             checked={user.id === defaultValue}/>
            {user.name}
        </span>
    ));
}

UsersChooser.propTypes = {
    changeHandler: PropTypes.func.isRequired, // function's param: event
    defaultValue: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    uniqueName: PropTypes.string.isRequired,
};

export default UsersChooser;