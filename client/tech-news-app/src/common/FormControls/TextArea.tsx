import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'

import okIcon from '../../static/ok-icon.png'
import errorIcon from '../../static/error-icon.png'

interface Props {
    label: string
    showlabel: boolean
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {name: string}
    meta: {
        touched: boolean
        error: boolean
    }
    options: Array<{id: number, title: string}>
}

/**
 * Контроль формы. TextArea
 */
export const TextArea: React.FC<Props> = ({input, meta, ...props}: Props): React.ReactElement => {
    const isError: boolean = meta.touched && meta.error

    return (
        <div style={{width: '100%'}}>
            {
                props.label && !props.showlabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.label}
                </label>
            }

            <>
                <textarea {...input}
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
