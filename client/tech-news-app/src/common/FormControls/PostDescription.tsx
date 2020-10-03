import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {change, FormAction} from 'redux-form'

interface Props {
    initValue: string
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {name: string}
    meta: {
        visited: boolean
        form: string
        error: boolean
        dispatch: (action: FormAction) => void
    }
}

/**
 * Контроль формы. PostDescription - tinymce editor
 */
export const PostDescription: React.FC<Props> = ({input, meta, ...props}: Props): React.ReactElement => {
    const isError: boolean = meta.visited && meta.error
    const [value, setValue] = useState<string>(props.initValue)

    return (
        <div style={{width: '100%'}}>
            {/*{...input}*/}
            <Editor {...props}
                    apiKey="API_KEY"
                    value={value}
                    initialValue={props.initValue}
                    /* eslint-disable */
                    onChange={() => {
                    }}
                    onEditorChange={(val: string) => {
                        if (val) {
                            setValue(val)
                            meta.dispatch(change(meta.form, input.name, val))
                        }
                    }}
                    init={{
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount autoresize'
                        ]
                    }}
            />

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
