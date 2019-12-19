import 'date-fns';
import React from 'react';
import "moment/locale/ru";
import {NavLink} from "react-router-dom";
import {Editor} from '@tinymce/tinymce-react';
import * as BaseRequest from "../../../../api/BaseRequest";

class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            preDescription: '',
            fullDescription: '',
            category: '',
            photo: ''
        }
    }

    onFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onDescriptionChange = (e) => {
        this.setState({fullDescription: e});
    };

    onPhotoChange = (e) => {
        this.setState({photo: e.target.files[0]});
    };

    updatePostData = () => {
        this.props.updatePostData({
            title: this.state.title,
            preDescription: this.state.preDescription,
            fullDescription: this.state.fullDescription,
            categoryId: this.state.category
        }, this.state.photo);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование поста</h4></div>
                        <div className="panel-body">
                            <form>

                                <h5 className="card-header ml-4 mr-4">Фотография</h5>
                                <div className="row p-3 ml-4 mr-4">
                                    <div className="col-4">
                                        <img className="post-edit-picture" alt="post-photo"
                                             src={BaseRequest.API_BASE_URL + '/posts/post/photo?id=' + this.props.post.id}/>
                                        <span className="ml-lg-5 text-secondary">текущее изображение</span>
                                    </div>
                                    <div className="col-8">
                                        <input className="post-edit-pic-input" type="file" onChange={this.onPhotoChange}
                                               name="photo" accept="image/*"/>
                                    </div>
                                </div>

                                <h5 className="card-header ml-4 mr-4">Заголовок</h5>
                                <div className="row p-3 ml-4 mr-4">
                                    <input type="text" name="title" className="input-group-form"
                                           defaultValue={this.props.post.title}
                                           placeholder="Введите заголовок поста"
                                           onChange={this.onFieldChange} required/>
                                </div>

                                <h5 className="card-header ml-4 mr-4">Краткое описание</h5>
                                <div className="row p-3 ml-4 mr-4">
                                    <textarea name="preDescription" className="form-control text-area"
                                              defaultValue={this.props.post.preDescription}
                                              placeholder="Введите краткое описание поста" rows="3"
                                              onChange={this.onFieldChange} required/>
                                </div>

                                <h5 className="card-header ml-4 mr-4">Категория</h5>
                                <div className="row p-3 ml-4 mr-4">
                                    <select className="form-control" defaultValue={this.props.post.categoryId}
                                            name="category" onChange={this.onFieldChange} required>
                                        <option value="" disabled>Выберите тип...</option>
                                        <option value="2">Смартфоны</option>
                                        <option value="3">Ноутбуки</option>
                                        <option value="4">Компьютерное железо</option>
                                        <option value="5">Разное</option>
                                    </select>
                                </div>

                                <h5 className="card-header ml-4 mr-4 ">Описание</h5>
                                <div className="p-3 ml-4 mr-4">
                                    <Editor
                                        apiKey="API_KEY"
                                        inline={true}
                                        initialValue={this.props.post.fullDescription}
                                        onEditorChange={this.onDescriptionChange}
                                        init={{plugins: ['link table', 'code']}}
                                    />
                                </div>

                                <div className="row p-2 ml-4 mr-1">
                                    <div className="col-12 mt-5 d-flex justify-content-end">
                                        <NavLink to={'/posts/' + this.props.sectionName + '/post/' + this.props.post.id}>
                                            <button type="button" className="btn btn-light mr-3">
                                                Вернуться к посту
                                            </button>
                                        </NavLink>
                                        <button type="button" className="btn btn-success"
                                                onClick={this.updatePostData}>
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostEdit;