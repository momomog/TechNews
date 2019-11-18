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
        <div className="col-lg-4 center-block mb-3">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center pagin-links">
                    <li className={getPreviousButtonClass()} onClick={() => {
                        setPrevNextPostPage(props.postPage - 1)
                    }}>
                        <NavLink className="page-link"
                                 to={"/posts/" + getSectionName(props.sectionId) + '/' + (props.postPage - 1)}
                                 tabIndex="-1">Назад</NavLink>
                    </li>

                    {
                        initPagesArray().map((page) => {
                            return <li className={getNavigationButtonClass(page)} onClick={setPostPage} key={page.id}>
                                <NavLink to={"/posts/" + getSectionName(props.sectionId) + '/' + page}
                                         className="page-link">{page}</NavLink>
                            </li>
                        })
                    }

                    <li className={getNextButtonClass()} onClick={() => {
                        setPrevNextPostPage(props.postPage + 1)
                    }}>
                        <NavLink to={"/posts/" + getSectionName(props.sectionId) + '/' + (props.postPage + 1)}
                                 className="page-link">Вперед</NavLink>
                    </li>
                </ul>
            </nav>
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
        if (props.postPage === 1) {
            return 'page-item disabled'
        }
        return 'page-item'
    }

    // блокировка кнопки "вперед", если номер страницы-пагинации последний
    function getNextButtonClass() {
        if (props.postPage === Math.ceil(props.postsCount / 5)) {
            return 'page-item disabled'
        }
        return 'page-item'
    }

    // active для текущей страницы-пагинации
    function getNavigationButtonClass(pageNumber) {
        if (props.postPage === pageNumber) {
            return 'page-item active'
        }
        return 'page-item'
    }
}

export default PagesNavigation;