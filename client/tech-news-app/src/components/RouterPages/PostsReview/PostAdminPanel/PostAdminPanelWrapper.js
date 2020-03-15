import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import PostAdminPanel from "./PostAdminPanel";
import PostAPI from "../../../../api/PostAPI";
import {NotificationManager} from "react-notifications";
import {setPostPageAndGetPosts} from "../../../../redux/PostsReducer";
import {getSectionName} from "../../../../common/Const";

class PostAdminPanelWrapper extends React.Component {

    deletePostById = () => {
        const me = this;
        const postId = this.props.postId;

        PostAPI.deletePostById(this.props.postId)
            .then(response => {
                window.scroll(0, 0);
                me.props.setPostPageAndGetPosts(me.props.sectionId, 1);
                me.props.history.push(`/posts/${getSectionName(me.props.sectionId)}`);
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно');
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка');
            })
    }

    render() {
        return <PostAdminPanel postId={this.props.postId}
                               deletePostById={this.deletePostById}/>
    }
}

let mapStateToProps = state => {
    return {
        sectionId: state.postsData.sectionId
    }
};

let mapDispatchToProps = dispatch => {
    return {
        setPostPageAndGetPosts: (sectionId, postPage) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostAdminPanelWrapper);