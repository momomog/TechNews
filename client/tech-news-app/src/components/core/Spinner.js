import React from "react";

import spinner from '../../static/Spinner.svg'

const Spinner = ({size = 220}) => {
    return (
        <img src={spinner}
             width={size}
             height={size}
             alt="loading..."/>
    )
}

export default Spinner