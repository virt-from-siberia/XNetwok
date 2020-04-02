import React, { Fragment } from "react";
import "./spinner.css";

export default () => (
    <Fragment>
        <div className='spinner-wrapper'>
            <div className='lds-dual-ring'></div>
        </div>
    </Fragment>
);
