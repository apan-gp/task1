import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'


function UsersChooser({ className, formName, users, changeHandler, defaultValue}) {
  return (
    <div className={className}>
      <label>Users</label>
      <div className="users-chooser">
        {renderUserRadios(formName, users, changeHandler, defaultValue)}
      </div>
    </div>
  );
}

/**
 * @param {string} formName
 * @param {Object} users object: {string name, number id}
 * @param {Function} changeHandler
 * @param {number} defaultValue
 */
function renderUserRadios(formName, users, changeHandler, defaultValue) {
  return users.map(({ id, name }) => (
    <span className="users-chooser__entry" key={id}>
      <input type="radio"
             name={formName}
             value={id}
             onChange={changeHandler}
             checked={id === defaultValue}
      />
      {name}
    </span>
  ));
}

UsersChooser.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  formName: PropTypes.string.isRequired,
};

export default UsersChooser;
