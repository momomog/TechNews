import 'date-fns';
import React from 'react';
import "moment/locale/ru";
import {NavLink} from "react-router-dom";

class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fullDescription: '',
            image: ''
        }
    }

    onFieldsChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    updatePostData = () => {
        this.props.updatePostData({
            title: this.state.title,
            fullDescription: this.state.fullDescription,
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование поста</h4></div>
                        <div className="panel-body">
                            <form>
                                <h5 className="card-header ml-4 mr-4">Заголовок</h5>
                                <div className="row p-3 ml-4 mr-4">
                                    <input type="text" name="title" className="input-group-form"
                                           defaultValue={this.props.post.title}
                                           placeholder="Введите заголовок поста"
                                           onChange={this.onFieldsChange} required/>
                                </div>

                                <h5 className="card-header ml-4 mr-4 ">Описание</h5>
                                <div className="row p-3 ml-4 mr-4">
                                <textarea className="form-control text-area vv" rows="12" name="fullDescription"
                                          placeholder="Введите описание поста..."
                                          onChange={this.onFieldsChange}
                                          defaultValue={this.props.post.fullDescription} required/>
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