import React from "react";
import { Link } from "react-router-dom";

function Anchor(props, {entidad}) {
    return (
        <Link to={props.href} className={props.className} entidad={entidad}>{props.description}</Link>
    )
}

export default Anchor;
