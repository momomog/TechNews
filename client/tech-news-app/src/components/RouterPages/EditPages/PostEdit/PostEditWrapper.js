import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import PostEdit from "./PostEdit";
import {getPostData} from "../../../../redux/PostsReducer";
import {NotificationManager} from "react-notifications";
import PostAPI from "../../../../api/PostAPI";

class PostEditWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId);
    }

    updatePostData = (formData) => {
        const me = this,
            request = {
                title: formData.title,
                preDescription: formData.preDescription,
                fullDescription: formData.fullDescription,
                categoryId: formData.categoryId
            },
            photo = formData.photo && formData.photo[0] ? formData.photo[0] : null

        PostAPI.onUpdatePostData(this.props.match.params.postId, request, photo)
            .then(response => {
                NotificationManager.success('Данные поста успешно обновлены', 'Успешно');
                me.props.history.goBack();
            }).catch(function (error) {
            NotificationManager.error('Не удалось обновить данные поста', 'Ошибка');
        })
    }

    render() {
        return <PostEdit post={this.props.postData}
                         sectionName={this.props.match.params.sectionName}
                         updatePostData={this.updatePostData}/>
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostEditWrapper);