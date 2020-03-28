import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {withRouter} from "react-router-dom";
import PostEdit from "./PostEdit";
import {getPostData} from "../../../../redux/PostsReducer";
import {NotificationManager} from "react-notifications";
import PostAPI from "../../../../api/PostAPI";
import {Post} from "../../../../models/PostModel";
import {RouteComponentProps} from "react-router";
import {PostRequest} from "../../../../models/RequestsModel";
import {RootState} from "../../../../redux/ReduxStore";

interface Props {
    postData: Post
    sectionId: number
    getPostData: (sectionId: number, postId: number) => void
}

/**
 *
 * @param sectionId
 * @param postData
 * @param getPostData
 * @param match
 * @param history
 * Оболочка Редактор поста
 */
const PostEditWrapper: React.FC<RouteComponentProps<any> & Props> = ({sectionId, postData, getPostData, match, history}) => {

    useEffect(() => {
        getPostData(sectionId, match.params.postId)
    }, [])

    const updatePostData = (formData: PostRequest) => {
        const request = {
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }
        const photo = formData.photo && formData.photo[0]

        PostAPI.onUpdatePostData(match.params.postId, request, photo)
            .then(() => {
                NotificationManager.success('Данные поста успешно обновлены', 'Успешно')
                history.goBack()
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные поста', 'Ошибка'))
    }

    return postData
        ? <PostEdit post={postData}
                    updatePostData={updatePostData}/>
        : <div/>
}

let mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostData: (sectionId: number, postId: number) => dispatch(getPostData(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditWrapper))