import React from 'react';

const AlertMessages = ({ info }) => {
    return info === null ? null : (
        <h6 className="alert alert-danger">
            {info.message}
        </h6>
    );
};

export default AlertMessages;