import React from 'react';

export default function Alert(props) {
    const capitalize = (type) => {
        if (type === "danger") {
            type = "error"
        }
        const lower = type.toUpperCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '10px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg} </div>}
        </div>
    )
}