import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {NavLink} from 'react-router-dom'
import React, {useState} from 'react'
import {Input} from '../../../../common/FormControls/Input'
import {
    maxLength1000,
    maxLength200,
    maxLength20000,
    minLength1000,
    minLength200,
    minLength50,
    required,
    requiredFile
} from '../../../../common/Validators'
import {TextArea} from '../../../../common/FormControls/TextArea'
import {Select} from '../../../../common/FormControls/Select'
import {FileInput} from '../../../../common/FormControls/FileInput'
import {PostDescription} from '../../../../common/FormControls/PostDescription'
import {PostRequest} from '../../../../models/RequestsModel'
import nocard from '../../../../static/nocard.jpg'

interface OwnProps {
    categories: Array<{ id: number, title: string }>
}

type ComponentProps = InjectedFormProps<PostRequest, OwnProps> & OwnProps

/**
 * Новый пост. Форма
 */
const PostPageForm: React.FC<ComponentProps> = ({categories, handleSubmit, invalid, submitSucceeded}: ComponentProps) => {
    const [photo, setPhoto] = useState<string>(nocard)

    const onLoadPhoto = (file: File) => {
        const reader = new FileReader()
        reader.readAsBinaryString(file)

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPhoto(`data:image/gif;base64,${btoa(reader.result)}`)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <h5 className="card-header ml-4 mr-4">Фотография</h5>
            <div className="row p-3 ml-1 mr-4 d-flex align-items-center">
                <div className="col-md-4">
                    <Field component={FileInput}
                           type="file"
                           validate={requiredFile}
                           onPreviewRender={onLoadPhoto}
                           accept="image/*"
                           name="photo"/>
                </div>
                <div className="col-md-5">
                    <img src={photo} alt="post_pic" style={{borderRadius: 10}} width={'100px'} height={'100px'}/>
                </div>
            </div>

            <h5 className="card-header ml-4 mr-4">Заголовок</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={Input}
                       type="text"
                       className="input-group-form"
                       placeholder="Введите заголовок поста"
                       name="title"
                       validate={[
                           required,
                           minLength50,
                           maxLength200
                       ]}/>
            </div>

            <h5 className="card-header ml-4 mr-4">Краткое описание</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={TextArea}
                       className="form-control text-area"
                       rows="3"
                       placeholder="Введите краткое описание поста"
                       name="preDescription"
                       validate={[
                           required,
                           minLength200,
                           maxLength1000
                       ]}/>
            </div>

            <h5 className="card-header ml-4 mr-4">Категория</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={Select}
                       className="form-control"
                       options={categories}
                       validate={required}
                       name="categoryId"/>
            </div>

            <h5 className="card-header ml-4 mr-4">Описание</h5>
            <div className="p-3 ml-4 mr-4">
                <Field component={PostDescription}
                       name="fullDescription"
                       validate={[
                           required,
                           minLength1000,
                           maxLength20000
                       ]}/>
            </div>

            <div className="row p-2 ml-4 mr-1">
                <div className="col-12 mt-5 d-flex justify-content-end">
                    <NavLink to="/admin-panel">
                        <button type="button"
                                className="btn btn-light mr-3"
                                disabled={submitSucceeded}>
                            Вернуться назад
                        </button>
                    </NavLink>
                    <button type="submit"
                            className="btn btn-success"
                            disabled={invalid || submitSucceeded}>
                        {submitSucceeded ? 'Сохранение...' : 'Создать'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm<PostRequest, OwnProps>({
    form: 'post'
})(PostPageForm)
