import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'

import okIcon from '../../static/ok-icon.png'
import {change, FormAction} from 'redux-form'
import errorIcon from '../../static/error-icon.png'
import {Nullable} from '../../models/Common'

interface Props {
    placeholder: string
    showlabel: boolean
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {name: string}
    onPreviewRender: (File) => void
    meta: {
        touched: boolean
        form: string
        error: boolean
        dispatch: (action: FormAction) => void
    }
}

/**
 * Контроль формы. Input type="file"
 */
export const FileInput: React.FC<Props> = ({input, meta, ...props}: Props): React.ReactElement => {
    const [value, setValue] = useState<Nullable<File>>()
    const isError: boolean = meta.touched && meta.error && !value

    return (
        <div style={{width: '100%'}}>

            {
                props.placeholder && !props.showlabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.placeholder}
                </label>
            }

            <>
                <input {...input}
                       {...props}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const file: Nullable<File> = e.target.files && e.target.files[0]
                           if (file)
                               setValue(file)
                           meta.dispatch(change(meta.form, input.name, file))

                           if (typeof props.onPreviewRender === 'function')
                               props.onPreviewRender(file)
                       }}
                    // value={undefined}
                       style={{
                           backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                           backgroundPosition: `100% -10%`,
                           backgroundRepeat: `no-repeat`,
                           marginBottom: `0px`
                       }}
                />
            </>

            {
                isError &&
                <div className="mr-5">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }

        </div>
    )
}
