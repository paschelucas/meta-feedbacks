import React from 'react';

const ProjectCard = (props) => {
    return (
        <li>
            <hr />
            <h4>{props.name}</h4>
        </li>
    );
};
export default ProjectCard;