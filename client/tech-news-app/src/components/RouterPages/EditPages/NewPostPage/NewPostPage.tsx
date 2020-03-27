import 'date-fns';
import React from 'react';
import "moment/locale/ru";
import PostPageReduxForm from "./PostPageForm";
import {PostRequest} from "../../../../models/RequestsModel";

interface Props {
    createNewPost: (request: PostRequest) => void
}

const NewPostPage: React.FC<Props> = ({createNewPost}) => {
    const categories = [
        {id: 2, title: 'Смартфоны'},
        {id: 3, title: 'Ноутбуки'},
        {id: 4, title: 'Компьютерное железо'},
        {id: 5, title: 'Разное'}
    ]

    const createPost = (formData: PostRequest) => createNewPost(formData)

    return (
        <div className="row">
            <div className="col-md-11 center-block ">
                <div className="panel panel-default">
                    <div className="panel-heading"><h4>Редактирование поста</h4></div>
                    <div className="panel-body">
                        <PostPageReduxForm onSubmit={createPost}
                                           categories={categories}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPostPage