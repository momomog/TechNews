import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {
    email,
    isSamePasswords,
    latinDigital,
    maxLength15,
    maxLength30,
    maxLength40,
    minLength3,
    minLength6,
    required,
    usernameEmailValidate
} from '../../../../common/Validators'
import {Input} from '../../../../common/FormControls/Input'
import {SignUpRequest} from '../../../../models/RequestsModel'

/**
 * Форма регистрации
 */
const RegistrationForm: React.FC<InjectedFormProps<SignUpRequest>> = ({handleSubmit, invalid, submitting}: InjectedFormProps<SignUpRequest>) => {
    return (
        <form onSubmit={handleSubmit}>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="firstName"
                           component={Input}
                           type="text"
                           className="form-control input-group-form"
                           placeholder="Имя"
                           label="Имя"
                           showlabel="true"
                           validate={[
                               required,
                               minLength3,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="lastName"
                           component={Input}
                           placeholder="Фамилия"
                           className="form-control input-group-form"
                           label="Фамилия"
                           showlabel="true"
                           validate={[
                               required,
                               minLength3,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="username"
                           component={Input}
                           placeholder="Ваш уникальный никнейм"
                           className="form-control input-group-form"
                           label="Никнейм"
                           showlabel="true"
                           validate={[
                               required,
                               latinDigital,
                               minLength3,
                               maxLength15
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="email"
                           component={Input}
                           name="email"
                           placeholder="Почтовый адрес"
                           className="form-control input-group-form"
                           label="Почта"
                           showlabel="true"
                           validate={[
                               required,
                               email,
                               maxLength40
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="password"
                           component={Input}
                           name="password"
                           placeholder="Минимальная длина 6 символов"
                           className="form-control input-group-form"
                           label="Пароль"
                           showlabel="true"
                           validate={[
                               required,
                               minLength6,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 ">
                    <Field type="password"
                           component={Input}
                           name="repeatPassword"
                           placeholder="Повторите пароль"
                           className="form-control input-group-form"
                           label="Повторите пароль"
                           showlabel="true"
                           validate={[
                               required,
                               minLength6,
                               maxLength30,
                               isSamePasswords
                           ]}/>
                </div>
            </div>

            <div className="form-group mt-3">
                <div className="col-sm-12 pl-0">
                    <button className="btn btn-success btn-block w-auto ml-4"
                            disabled={invalid || submitting}
                            value="Зарегистрировать">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm<SignUpRequest>({
    form: 'registration',
    asyncValidate: usernameEmailValidate,
    asyncBlurFields: ['username', 'email']
})(RegistrationForm)
