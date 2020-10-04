import React from 'react'
import {Input} from '../../../../../common/FormControls/Input'
import {Field} from 'redux-form'

interface Props {
    isSocial?: boolean
    name: string
    label: string
    validator?: (value: string) => string | undefined
}

/**
 * Редактор профиля. Компонент формы
 */
const ProfileField: React.FC<Props> = ({isSocial, name, label, validator}: Props) => {
    return (
        <div className="col-sm-5 mt-4 d-flex justify-content-end">
            <div className="w-50 d-flex justify-content-end">
                {
                    isSocial &&
                    <i id="social-gp" className={`fa fa-${name} social mr-2 mt-4 profile-edit-icon`}/>
                }
                <span className="mr-2 soc-name">{`${label}`}</span>
            </div>

            <div className="w-50">
                <Field component={Input}
                       className="input-group-form mt-3"
                       name={name}
                       validate={validator}/>
            </div>
        </div>
    )
}

export default ProfileField
