import React, {useContext, useMemo} from 'react'
import {NavLink} from 'react-router-dom'
import {getSectionName} from '../../../../common/Const'
import {AppThemeContext, ThemeContext} from '../../../../context/ThemeContext'

interface Props {
    postPage: number
    postsCount: number
    sectionId: number
    setPosts: (sectionId: number, postPage: number) => void
}

/**
 * Пагинатор
 */
const PagesNavigation: React.FC<Props> = ({postPage, postsCount, setPosts, sectionId}: Props) => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const navItemClasses: Array<string> = ['page-link', isLight ? 'background-pagination-light' : 'background-pagination-dark' ]

    const onePagePostsCount = 10
    const maxPagesCount = 7
    const setPostPage = e => setPosts(sectionId, Number(e.target.textContent))
    const setPrevNextPostPage = (page: number) => setPosts(sectionId, page)

    const prevButtonClassname = useMemo(getPreviousButtonClass, [postPage])
    const nextButtonClassname = useMemo(getNextButtonClass, [postPage])
    const pagesCountArray = useMemo(initPagesArray, [postPage, postsCount])

    return (
        <div className="row">
            <div className="col-sm-12 d-flex justify-content-center mb-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center pagin-links">

                        <li className={prevButtonClassname}
                            onClick={() => setPrevNextPostPage(postPage - 1)}>
                            <NavLink className={navItemClasses.join(' ')}
                                     to={`/posts/${getSectionName(sectionId)}/${postPage - 1}`}>
                                Назад
                            </NavLink>
                        </li>

                        {
                            pagesCountArray.map((page) => {
                                return (
                                    <li className={getActiveButtonClass(page)} onClick={setPostPage} key={page}>
                                        <NavLink to={`/posts/${getSectionName(sectionId)}/${page}`}
                                                 className={navItemClasses.join(' ')}>
                                            {page}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }

                        <li className={nextButtonClassname}
                            onClick={() => setPrevNextPostPage(postPage + 1)}>
                            <NavLink to={`/posts/${getSectionName(sectionId)}/${postPage + 1}`}
                                     className={navItemClasses.join(' ')}>
                                Вперед
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    )

    // инициализация количества страниц-пагинации
    function initPagesArray() {
        const page = postPage,
            pagesArray: Array<number> = [],
            pagesCount = Math.ceil(postsCount / onePagePostsCount)

        if (pagesCount <= maxPagesCount) {
            for (let i = 1; i <= pagesCount; i++) {
                pagesArray.push(i)
            }
        } else if (4 >= page) {
            for (let i = 1; i <= maxPagesCount; i++) {
                pagesArray.push(i)
            }
        } else if (page >= pagesCount - 2) {
            for (let i = 6; i >= 0; i--) {
                pagesArray.push(pagesCount - i)
            }
        } else {
            for (let i = -3; i <= 3; i++) {
                pagesArray.push(page + i)
            }
        }

        return pagesArray
    }

    // блокировка кнопки "назад", если номер страницы-пагинации 1
    function getPreviousButtonClass() {
        return postPage === 1 ? 'page-item disabled' : 'page-item'
    }

    // блокировка кнопки "вперед", если номер страницы-пагинации последний
    function getNextButtonClass() {
        return postPage === Math.ceil(postsCount / onePagePostsCount) ? 'page-item disabled' : 'page-item'
    }

    // active для текущей страницы-пагинации
    function getActiveButtonClass(pageNumber) {
        return postPage === pageNumber ? 'page-item active' : 'page-item'
    }
}

export default PagesNavigation
