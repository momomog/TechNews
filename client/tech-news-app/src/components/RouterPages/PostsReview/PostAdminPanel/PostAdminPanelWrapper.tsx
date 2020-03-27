import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Dispatch} from "redux";
import PostAdminPanel from "./PostAdminPanel";
import PostAPI from "../../../../api/PostAPI";
import {NotificationManager} from "react-notifications";
import {setPostPageAndGetPosts} from "../../../../redux/PostsReducer";
import {getSectionName} from "../../../../common/Const";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../../../redux/ReduxStore";

interface Props {
    sectionId: number
    postId: number
    setPostPageAndGetPosts: (sectionId, postPage) => void
}

const PostAdminPanelWrapper: React.FC<RouteComponentProps<any> & Props> = ({setPostPageAndGetPosts, sectionId, postId, history}) => {

    const deletePostById = () => {
        PostAPI.deletePostById(postId)
            .then(response => {
                setPostPageAndGetPosts(sectionId, 1)

                setTimeout(() => {
                    window.scroll(0, 0)
                    history.push(`/posts/${getSectionName(sectionId)}`)
                    NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
                }, 2000)
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка')
            })
    }

    return <PostAdminPanel postId={postId}
                           onDeletePost={deletePostById}/>

}

let mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPostPageAndGetPosts: (sectionId: number, postPage: number) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAdminPanelWrapper))