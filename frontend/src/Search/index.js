import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './index.scss';


function Search(props) {
  const [timerId, setTimerId] = useState(null);
  const refOfInputField = useRef(null);

  const onChangeCallback = useCallback(
    () => {
      if (!props.requestHandler || !refOfInputField || !refOfInputField.current) {
        return;
      }

      if (null !== timerId) {
        clearTimeout(timerId);
      }
      setTimerId(setTimeout(() => props.requestHandler(refOfInputField.current.value), 1000));
    },
    [props, refOfInputField, setTimerId, timerId]
  );

  return (
    <div className="search-box">
      <input className="search-box__input" type="text" ref={refOfInputField} onChange={onChangeCallback}/>
    </div>
  );
}

Search.propTypes = {
  requestHandler: PropTypes.func,
};

export default Search;
