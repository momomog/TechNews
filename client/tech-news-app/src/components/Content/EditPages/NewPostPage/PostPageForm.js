import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import React from "react";
import {Input} from "../../../../common/FormControls/Input";
import {
    maxLength1000,
    maxLength200, maxLength20000,
    minLength1000,
    minLength200,
    minLength50,
    required, requiredFile
} from "../../../../common/Validators";
import {TextArea} from "../../../../common/FormControls/TextArea";
import {Select} from "../../../../common/FormControls/Select";
import {FileInput} from "../../../../common/FormControls/FileInput";
import {PostDescription} from "../../../../common/FormControls/PostDescription";

export const PostPageReduxForm = reduxForm({
    form: 'post'
})(PostPageForm)

function PostPageForm(props) {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit}>

            <h5 className="card-header ml-4 mr-4">Фотография</h5>
            <div className="row p-3 ml-1 mr-4">
                <div className="col-8">
                    <Field component={FileInput}
                           type="file"
                           validate={requiredFile}
                           accept="image/*"
                           name="photo"/>
                </div>
            </div>

            <h5 className="card-header ml-4 mr-4">Заголовок</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={Input}
                       type="text"
                       validate={[
                           required,
                           minLength50,
                           maxLength200
                       ]}
                       className="input-group-form"
                       showlabel={'true'}
                       placeholder="Введите заголовок поста"
                       name="title"/>
            </div>

            <h5 className="card-header ml-4 mr-4">Краткое описание</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={TextArea}
                       className="form-control text-area"
                       validate={[
                           required,
                           minLength200,
                           maxLength1000
                       ]}
                       rows="3"
                       showlabel={'true'}
                       placeholder="Введите краткое описание поста"
                       name="preDescription"/>
            </div>

            <h5 className="card-header ml-4 mr-4">Категория</h5>
            <div className="row p-3 ml-4 mr-4">
                <Field component={Select}
                       className="form-control"
                       options={props.categories}
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
                                className="btn btn-light mr-3">
                            Вернуться назад
                        </button>
                    </NavLink>
                    <button type="submit"
                            className="btn btn-success"
                            disabled={props.invalid}>
                        Создать
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PostPageReduxForm