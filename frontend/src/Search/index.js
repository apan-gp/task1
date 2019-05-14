import React, {useRef} from 'react';
import PropTypes from 'prop-types';


function Component(props) {
    const refOfInputField = useRef(null);

    const clickHandlerOfGo = createGoClickHandler(refOfInputField, props.requestHandler);

    return (
        <div className="search-box">
            <input className="search-box__input" type="text" ref={refOfInputField} />
            <button className="search-box__go-button" onClick={clickHandlerOfGo}>Go!</button>
        </div>
    );
}

/**
 * @dataHandler function with params: value of input text field
 */
function createGoClickHandler(inputField, dataHandler) {
    if (!dataHandler || !inputField || !inputField.current) {
        return () => {};
    }

    return () => {
        dataHandler(inputField.current.value);
    };
}

Component.propTypes = {
    requestHandler: PropTypes.func,
};

export default Component;