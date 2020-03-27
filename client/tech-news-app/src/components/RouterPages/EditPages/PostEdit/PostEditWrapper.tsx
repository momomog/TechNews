import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import PostEdit from "./PostEdit";
import {getPostData} from "../../../../redux/PostsReducer";
import {NotificationManager} from "react-notifications";
import PostAPI from "../../../../api/PostAPI";
import {ChangeSectionAction, Post} from "../../../../models/PostModel";
import {RouteComponentProps} from "react-router";
import {PostRequest} from "../../../../models/RequestsModel";

interface Props {
    postData: Post
    sectionId: number
    getPostData: (sectionId: number, postId: number) => void
}

class PostEditWrapper extends React.Component<RouteComponentProps<any> & Props> {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId);
    }

    updatePostData = (formData: PostRequest) => {
        const me = this,
            request = {
                title: formData.title,
                preDescription: formData.preDescription,
                fullDescription: formData.fullDescription,
                categoryId: formData.categoryId
            },
            photo = formData.photo && formData.photo[0]

        PostAPI.onUpdatePostData(this.props.match.params.postId, request, photo)
            .then(response => {
                NotificationManager.success('Данные поста успешно обновлены', 'Успешно');
                me.props.history.goBack();
            }).catch(function (error) {
            NotificationManager.error('Не удалось обновить данные поста', 'Ошибка');
        })
    }

    render() {
        return this.props.postData
            ? <PostEdit post={this.props.postData}
                        updatePostData={this.updatePostData}/>
            : ''
    }
}

let mapStateToProps = (state) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getPostData: (sectionId, postId) => dispatch(getPostData(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditWrapper))