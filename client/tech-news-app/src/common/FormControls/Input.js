import React from "react";

export const Input = ({input, meta, ...props}) => {
    return (
        <div>
            <label className="col-sm-5 control-label required-field reg-label">
                {props.placeholder}
            </label>
            <div>
                <input {...input} {...props}/>
            </div>

            {
                meta.touched
                && meta.error
                && <div className="col-12">
                    <div className="text-danger text-center">
                        {meta.error}
                    </div>
                </div>
            }
        </div>
    )
}