import React, {useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {change} from "redux-form";

export const PostDescription = ({input, meta, ...props}) => {
    const isError = meta.visited && meta.error;
    let [value, setValue] = useState(props.initValue)

    return (
        <div style={{width: '100%'}}>
            <Editor {...input}
                    {...props}
                    apiKey="API_KEY"
                    value={value}
                    initialValue={props.initValue}
                    onChange={() => {
                    }}
                    onEditorChange={val => {
                        if (val) {
                            setValue(val)
                            meta.dispatch(change(meta.form, input.name, val));
                        }
                    }}
                    init={{
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
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