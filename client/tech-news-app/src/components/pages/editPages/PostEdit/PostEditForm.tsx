import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {useHistory} from 'react-router-dom'
import React, {useEffect} from 'react'
import {Input} from '../../../../common/FormControls/Input'
import {
    maxLength1000,
    maxLength200,
    maxLength20000,
    minLength1000,
    minLength200,
    minLength50,
    required
} from '../../../../common/Validators'
import {TextArea} from '../../../../common/FormControls/TextArea'
import {Select} from '../../../../common/FormControls/Select'
import {FileInput} from '../../../../common/FormControls/FileInput'
import {PostDescription} from '../../../../common/FormControls/PostDescription'
import {PostRequest} from '../../../../models/RequestsModel'
import {Post} from '../../../../models/PostModel'
import {History} from 'history'

interface OwnProps {
    categories: Array<{ id: number, title: string }>
    post: Post
}

type ComponentProps = InjectedFormProps<PostRequest, OwnProps> & OwnProps

/**
 * Редактор поста. Форма
 */
const PostEditForm: React.FC<ComponentProps> = ({categories, post, initialize, submitSucceeded, invalid, handleSubmit}: ComponentProps) => {
    const history: History = useHistory()

    useEffect(() => {
        initialize({
            title: post.title,
            preDescription: post.preDescription,
            fullDescription: post.fullDescription,
            categoryId: post.categoryId
        })
    }, [post, initialize])


    return (
        <form onSubmit={handleSubmit}>

            <h5 className="card-header ml-4 mr-4">Фотография</h5>
            <div className="row p-3 ml-4 mr-4">
                <div className="col-4">
                    <img className="post-edit-picture" alt="post"
                         src={post.photoId && `https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                </div>
                <div className="col-sm-8 d-flex align-items-end">
                    <Field component={FileInput}
                           type="file"
                           accept="image/*"
                           name="photo"/>
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
                       initValue={post.fullDescription}
                       validate={[
                           required,
                           minLength1000,
                           maxLength20000
                       ]}/>
            </div>

            <div className="row p-2 ml-4 mr-1">
                <div className="col-12 mt-5 d-flex justify-content-end">
                    <button type="button"
                            className="btn btn-light mr-3"
                            onClick={() => history.goBack()}
                            disabled={submitSucceeded}>
                        Вернуться назад
                    </button>
                    <button type="submit"
                            className="btn btn-success"
                            disabled={invalid || submitSucceeded}>
                        {submitSucceeded ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm<PostRequest, OwnProps>({
    form: 'editPost'
})(PostEditForm)
