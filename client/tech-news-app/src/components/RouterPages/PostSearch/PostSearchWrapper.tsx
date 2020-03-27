import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PostAPI from "../../../api/PostAPI";
import {Post} from "../../../models/PostModel";
import Spinner from "../../core/Spinner";
import PostSearch from "./PostSearch";
import {connect} from "react-redux";
import {RootState} from "../../../redux/ReduxStore";
import {Dispatch} from "redux";
import {setPostIdAction} from "../../../redux/PostsReducer";

interface Props {
    setPostId: (id: number) => void
}

/**
 * @param setPostId
 * Оболочка для компонента Поиск по сайту
 */
const PostSearchWrapper: React.FC<Props> = ({setPostId}) => {
    const [searchText, setSearchText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setSearchPosts] = useState<Array<Post>>([]);

    const query = new URLSearchParams(useLocation().search)
    const search_query = query.get('search_query');

    useEffect(() => {
        if (search_query && !searchText || search_query && searchText && search_query !== searchText) {
            setSearchText(search_query)
            setIsLoading(true)

            PostAPI.searchPosts(search_query)
                .then((response: Array<Post>) => {
                    setSearchPosts(response)
                    setIsLoading(false)
                })
                .catch(error => setIsLoading(false))
        }
    })

    return (
        <div>
            {
                isLoading
                    ? <Spinner/>
                    : posts.length
                    ? <PostSearch posts={posts}
                                  setPostId={setPostId}
                                  searchText={searchText}/>
                    : <h4 className="text-center mt-5">Не найдено записей, удовлетворящих запросу "{searchText}"</h4>
            }
        </div>

    )
}

const mapStateToProps = (state: RootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPostId: (id: number) => dispatch(setPostIdAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSearchWrapper)