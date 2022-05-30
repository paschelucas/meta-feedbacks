import React from "react";

const UserCard = (props) => {
    return (
        <li key={props.key}>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.role}</p>
        </li>
    );
};
export default UserCard;