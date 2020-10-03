import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'

import okIcon from '../../static/ok-icon.png'
import errorIcon from '../../static/error-icon.png'
import {FormAction} from 'redux-form'

interface Props {
    placeholder: string
    showlabel: boolean
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {name: string}
    meta: {
        touched: boolean
        form: string
        error: boolean
        dispatch: (action: FormAction) => void
    }
    options: Array<{id: number, title: string}>
}

/**
 * Контроль формы. Select
 */
export const Select: React.FC<Props> = ({input, meta, ...props}: Props): React.ReactElement => {
    const isError: boolean = meta.touched && meta.error

    return (
        <div style={{width: '100%'}}>
            {
                props.placeholder && !props.showlabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.placeholder}
                </label>
            }

            <>
                <select {...input}
                        {...props}
                        style={{
                            border: isError ? '1px solid red' : meta.touched ? '1px solid green' : '',
                            backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                            backgroundPosition: `96% 50%`,
                            backgroundRepeat: `no-repeat`,
                            marginBottom: `0px`
                        }}>
                    <option value="" disabled defaultValue={'true'}>Выберите тип...</option>
                    {
                        props.options.map(option => <option value={option.id} key={option.id}>{option.title}</option>)
                    }
                </select>
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
