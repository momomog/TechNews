import React, {useState} from 'react'
import Common from '../../../common/Common'
import PostItem from '../PostsList/PostItem/PostItem'
import {Post} from '../../../models/PostModel'
import ScrollUpButton from 'react-scroll-up-button'

interface Props {
    posts: Array<Post>
    searchText: string
    setPostId: (id: number) => void
}

/**
 *
 * @param posts
 * @param searchText
 * @param setPostId
 * Поиск по сайту
 */
const PostSearch: React.FC<Props> = ({posts, searchText, setPostId}) => {
    const oneTimePostShowCount = 15
    const [showPosts, setShowPosts] = useState<Array<Post>>(postsInit())
    const [showPostsCount, setShowPostsCount] = useState<number>(oneTimePostShowCount)

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <h3 className="ml-6 mt-0">По вашему запросу
                        "{searchText}" {Common.getFindPostsResultText(posts.length)}:</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    {
                        showPosts.map(post => {
                            return <PostItem post={post}
                                             setPostId={setPostId}
                                             key={post.id}/>
                        })
                    }

                    {
                        showPosts.length && showPosts[showPosts.length - 1].id !== posts[posts.length - 1].id &&
                        <div className="row d-flex justify-content-center">
                            <button className="btn btn-default mb-4" onClick={showMorePosts}>
                                Показать еще <i className="glyphicon glyphicon-arrow-down"/>
                            </button>
                        </div>
                    }
                    <ScrollUpButton style={{outline: 'none', height: '40px', width: '40px'}}
                                    ShowAtPosition={600}
                                    EasingType="easeInOutQuad"/>
                </div>
            </div>
        </>
    )

    function postsInit(): Array<Post> {
        if (posts.length < oneTimePostShowCount)
            return posts
        else {
            const initPosts = [...posts]
            initPosts.length = oneTimePostShowCount
            return initPosts
        }
    }

    function showMorePosts() {
        const nextPostsCount = showPostsCount + oneTimePostShowCount < posts.length ? showPostsCount + oneTimePostShowCount : posts.length
        setShowPostsCount(nextPostsCount)
        const initPosts = [...posts]
        initPosts.length = nextPostsCount
        setShowPosts(initPosts)
    }
}

export default PostSearch