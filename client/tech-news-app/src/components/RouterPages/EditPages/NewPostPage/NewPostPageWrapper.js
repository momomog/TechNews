import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import NewPostPage from "./NewPostPage";
import {getSectionName} from "../../../../common/Const";
import {NotificationManager} from "react-notifications";
import PostAPI from "../../../../api/PostAPI";
import {chooseSectionAction, getAllPosts, setPostPageAction} from "../../../../redux/PostsReducer";

class NewPostPageWrapper extends React.Component {
    createNewPost = (formData) => {
        const me = this;

        PostAPI.onCreateNewPost({
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }, formData.photo[0])
            .then(() => {
                me.props.changeSection(+formData.categoryId);
                me.props.setPostPage();
                me.props.getPosts(+formData.categoryId);
                me.props.history.push(`/posts/${getSectionName(formData.categoryId)}`)
            })
            .catch(error => {
                NotificationManager.error('Не удалось создать новый пост', 'Ошибка');
            })
    }

    render() {
        return <NewPostPage createNewPost={this.createNewPost}/>
    }
}

let mapStateToProps = (state) => {
    return {}
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        setPostPage: () => dispatch(setPostPageAction()),
        getPosts: sectionId => dispatch(getAllPosts(sectionId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(NewPostPageWrapper);