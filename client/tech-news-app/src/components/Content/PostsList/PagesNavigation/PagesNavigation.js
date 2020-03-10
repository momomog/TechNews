import React from 'react';
import {NavLink} from "react-router-dom";
import {getSectionName,} from "../../../../common/Const";

function PagesNavigation(props) {

    function setPostPage(e) {
        props.setPosts(props.sectionId, Number(e.target.textContent));
    }

    function setPrevNextPostPage(page) {
        props.setPosts(props.sectionId, page);
    }

    return (
        <div className="row">
            <div className="col-lg-4 center-block mb-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center pagin-links">
                        <li className={getPreviousButtonClass()}
                            onClick={() => setPrevNextPostPage(props.postPage - 1)}>
                            <NavLink className="page-link"
                                     to={`/posts/${getSectionName(props.sectionId)}/${props.postPage - 1}`}
                                     onClick={() => window.scroll(0, 0)}>
                                Назад
                            </NavLink>
                        </li>

                        {
                            initPagesArray().map((page) => {
                                return <li className={getNavigationButtonClass(page)} onClick={setPostPage} key={page}>
                                    <NavLink to={`/posts/${getSectionName(props.sectionId)}/${page}`}
                                             className="page-link"
                                             onClick={() => window.scroll(0, 0)}>
                                        {page}
                                    </NavLink>
                                </li>
                            })
                        }

                        <li className={getNextButtonClass()}
                            onClick={() => setPrevNextPostPage(props.postPage + 1)}>
                            <NavLink to={`/posts/${getSectionName(props.sectionId)}/${props.postPage + 1}`}
                                     className="page-link"
                                     onClick={() => window.scroll(0, 0)}>
                                Вперед
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );

    // инициализация количества страниц-пагинации
    function initPagesArray() {
        let pagesArray = [];
        let pagesCount = Math.ceil(props.postsCount / 5);
        for (let i = 1; i <= pagesCount; i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }

    // блокировка кнопки "назад", если номер страницы-пагинации 1
    function getPreviousButtonClass() {
        return props.postPage === 1 ? 'page-item disabled' : 'page-item'
    }

    // блокировка кнопки "вперед", если номер страницы-пагинации последний
    function getNextButtonClass() {
        return props.postPage === Math.ceil(props.postsCount / 5) ? 'page-item disabled' : 'page-item'
    }

    // active для текущей страницы-пагинации
    function getNavigationButtonClass(pageNumber) {
        return props.postPage === pageNumber ? 'page-item active' : 'page-item'
    }
}

export default PagesNavigation;