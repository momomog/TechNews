import React from 'react'
import PostEditReduxForm from './PostEditForm'
import {Post} from '../../../../models/PostModel'
import {PostRequest} from '../../../../models/RequestsModel'
import {categories} from '../../../../common/Const'

interface Props {
    post: Post
    updatePostData: (formData: PostRequest) => void
}

/**
 * Редактор поста
 */
const PostEdit: React.FC<Props> = ({post, updatePostData}: Props) => {

    const updatePost = (formData: PostRequest) => updatePostData(formData)

    return (
        <div className="row">
            <div className="col-md-11 center-block ">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4>Редактирование поста</h4>
                    </div>

                    <div className="panel-body">
                        <PostEditReduxForm post={post}
                                           categories={categories}
                                           onSubmit={updatePost}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PostEdit
