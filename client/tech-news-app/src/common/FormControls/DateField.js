import React, {useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import * as moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {change} from "redux-form";

export const DateField = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error,
        [initValue, setInitValue] = useState(props.initValue);

    return (
        <div>
            <MuiPickersUtilsProvider libInstance={moment}
                                     utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={props.className}
                    label=" "
                    name={props.name}
                    format="dd.MM.yyyy"
                    value={initValue}
                    onChange={(value) => {
                        setInitValue(value)
                        meta.dispatch(change('profile', 'birthDate', value));
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>

            {
                isError && <div className="col-12">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }
        </div>
    )
}