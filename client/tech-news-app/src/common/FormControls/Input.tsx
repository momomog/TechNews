import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'

import okIcon from '../../static/ok-icon.png'
import errorIcon from '../../static/error-icon.png'
import {FormAction} from "redux-form";

interface Props {
    label: string
    showlabel: boolean
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {name: string}
    meta: {
        touched: boolean
        form: string
        error: boolean
        dispatch: (action: FormAction) => void
    }
}


/**
 * Контроль формы. Для type="file" используется компонент FileInput
 */
export const Input: React.FC<Props> = ({input, meta, ...props}: Props): React.ReactElement => {
    const isError: boolean = meta.touched && meta.error

    return (
        <div className="w-100">
            {
                props.label && props.showlabel &&
                <label className="col-sm-12 control-label required-field reg-label">
                    {props.label}
                </label>
            }

            <>
                <input {...input}
                       {...props}
                       style={{
                           border: isError ? '1px solid red' : meta.touched ? '1px solid green' : '',
                           backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                           backgroundPosition: `96% 50%`,
                           backgroundRepeat: `no-repeat`,
                           marginBottom: `0px`
                       }}
                />
            </>

            {
                isError &&
                <div className="col-12">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }
        </div>
    )
}
