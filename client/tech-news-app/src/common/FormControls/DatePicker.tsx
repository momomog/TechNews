import React, {useEffect, useState} from 'react'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import * as moment from 'moment'
import DateFnsUtils from '@date-io/date-fns'
import {change} from 'redux-form'
import {Nullable} from "../../models/Common";

/**
 * Контроль формы. DatePicker
 */
export const DatePicker = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error,
        [initValue, setInitValue] = useState<Nullable<Date>>(null)

    useEffect(() => setInitValue(props.initValue || null), [props.initValue])

    return (
        <>
            <MuiPickersUtilsProvider libInstance={moment}
                                     utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={props.className}
                    label=" "
                    name={props.name}
                    format="dd.MM.yyyy"
                    invalidDateMessage="Введен неверный формат даты"
                    minDateMessage="Введена слишком ранняя дата"
                    maxDateMessage="Введена слишком поздняя дата"
                    value={initValue}
                    onChange={(value: Nullable<Date>) => {
                        let date = value
                        // Сетаем дате 12 часов, иначе ф-ция JSON.stringify() отнимет у даты 4 часа и получится предыдущий день
                        if (value)
                         date = new Date(value.setHours(12))
                        setInitValue(date)
                        meta.dispatch(change('profile', 'birthDate', date))
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                />
            </MuiPickersUtilsProvider>

            {
                isError && <div className="col-xs-12">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }
        </>
    )
}