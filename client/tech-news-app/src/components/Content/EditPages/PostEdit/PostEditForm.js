import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import React from "react";
import {Input} from "../../../../common/FormControls/Input";
import {
    maxLength1000,
    maxLength200,
    maxLength20000,
    minLength1000,
    minLength200,
    minLength50,
    required
} from "../../../../common/Validators";
import {TextArea} from "../../../../common/FormControls/TextArea";
import {Select} from "../../../../common/FormControls/Select";
import {FileInput} from "../../../../common/FormControls/FileInput";
import {PostDescription} from "../../../../common/FormControls/PostDescription";


class PostEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialized: false,
            fullDescription: undefined
        }
    }

    componentDidUpdate() {
        const post = this.props.post;

        if (post.id && !this.state.isInitialized) {
            this.props.initialize({
                title: post.title,
                preDescription: post.preDescription,
                fullDescription: post.fullDescription,
                categoryId: post.categoryId,
            });

            this.setState({
                isInitialized: true,
                fullDescription: post.fullDescription
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>

                <h5 className="card-header ml-4 mr-4">Фотография</h5>
                <div className="row p-3 ml-4 mr-4">
                    <div className="col-4">
                        <img className="post-edit-picture" alt="post-photo"
                             src={this.props.post.photoId
                             && 'https://drive.google.com/uc?export=view&id=' + this.props.post.photoId
                             }/>
                        <span className=" text-secondary" style={{marginLeft: '22%'}}>текущее изображение</span>
                    </div>
                    <div className="col-8">
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
                           options={this.props.categories}
                           validate={required}
                           name="categoryId"/>
                </div>

                <h5 className="card-header ml-4 mr-4">Описание</h5>
                <div className="p-3 ml-4 mr-4">
                    <Field component={PostDescription}
                           name="fullDescription"
                           initValue={this.state.fullDescription}
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
                                disabled={this.props.errors || this.props.submitting}>
                            Создать
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export const PostEditReduxForm = reduxForm({
    form: 'editPost'
})(PostEditForm)

export default PostEditReduxForm