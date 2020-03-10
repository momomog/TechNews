import 'date-fns';
import React from 'react';
import "moment/locale/ru";
import PostEditReduxForm from "./PostEditForm";

class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.categories = [
            {id: 2, title: 'Смартфоны'},
            {id: 3, title: 'Ноутбуки'},
            {id: 4, title: 'Компьютерное железо'},
            {id: 5, title: 'Разное'}
        ]
    }

    updatePostData = (formData) => {
        this.props.updatePostData(formData);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование поста</h4></div>
                        <div className="panel-body">

                            <PostEditReduxForm post={this.props.post}
                                               categories={this.categories}
                                               onSubmit={this.updatePostData}/>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostEdit;