import React, {useContext} from 'react'
import {ThemeContext} from '../../../context/ThemeContext'
import {NavLink} from 'react-router-dom'
import thinkingMan from '../../../static/thinking-man.jpg'
import writingCodeMan from '../../../static/writting-code-man.jpg'

const History: React.FC = () => {
    const {isLight} = useContext(ThemeContext)
    const cardClasses = ['panel', 'panel-default', isLight ? 'background-light' : 'background-dark']

    return (
        <div className="row history-container">
            <div className="col-md-11 center-block pl-0 pr-0">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading"><h3>История создания</h3></div>
                    <div className="panel-body">
                        <p className="block-name">О чем данный сайт</p>
                        <p>Tech-news.ru - сайт о новостях в сфере цифровой индустрии.</p>
                        <p>Каждый день на сайте появляются интереснейшие статьи, собираются и анализируются новости,
                            слухи, гипотезы и теории из Интрернета,
                            технологий, космоса, медицины, физики и химии, новых мобильных приложениях и так далее.
                        </p>
                        <p className="block-name">Предпосылки к созданию</p>
                        <img src={thinkingMan} className="history-img" alt="thinkingMan"/>
                        <p>Впервые мысль о том, что неплохо бы создать свой сайт, возникла весной 2019 года, под
                            окончание моей стажерской программы в одной из IT-компаний. Цель была довольно банальна и
                            проста
                            - набраться опыта разработки, чтобы стать хорошим специалистом и уметь решать большинство
                            требуемых задач. Встал вопрос о том, на чем этот сайт будет написан. На фреймворке ExtJS, с
                            коим мне приходилось работать, я писать не хотел по двум причинам:
                        </p>
                        <p>1. Мне не нравится оперирование разметкой и элементами в виде JS-объектов.</p>
                        <p>2. Писать на технологии, используемой в рабочей сфере и дома - скучно. Необходимо
                            разнообразие.</p>
                        <p>
                            Не имея большого опыта работы в сфере веб-разработки
                            (как в общем-то и любой другой разработке) и не зная толком какие технологии наиболее
                            популярны и востребованы, я начал смотреть рынок frontend-специалистов на hh.ru. В ответ
                            получил практически однозначный ответ: React. Стоить отдать должное Angular и Vue, они
                            недалеко ушли от React по количеству вакансий.</p>
                        <p>
                            Посмотрев на синтаксис библиотеки (а React позиционирует себя как библиотека)
                            в виде JSX, он показался довольно-таки дружелюбным. Также большое количество уже
                            написанных библиотек воодушевляло мысль о том, что не придется изобретать своих велосипедов,
                            а можно использовать уже готовые решения. Однако, в отличии от того же Angular,
                            который позиционируется как фреймворк и уже включает в себя большинство необходимых для
                            разработки модулей, в React их необходимо устанавливать отдельно. Хочешь роутинг - ставь
                            пакет react-router-dom, хочешь удобную работу с формами - redux-form и так далее...
                        </p>

                        <p className="block-name">Создание</p>
                        <img src={writingCodeMan} className="history-img" alt="thinkingMan"/>
                        <p>Стоит отметить, у React описана отличная документация на официальном сайте. Также
                            присутствует множество статей и видеоматериалов. Поэтому с изучением
                            библиотеки проблем не возникло. Оговорюсь сразу, разработка сайта проводилась с двух
                            попыток, и каждая с "нуля".</p>
                        <p>Первая попытка, судя по initial коммиту, состоялась в июне 2019 года параллельно с началом
                            изучения React. Образно говоря, писал так, как мог. Работает - супер. Здравый смысл говорит,
                            что код более-менее читаем и логичен - еще лучше. Однако, и, наверное, не удивительно,
                            со временем начало приходить понимание, что "что-то не так". В одном месте работу с
                            компонентами можно упростить, в другом месте подход к отрисовке и сайд-эффектам казался
                            нелогичным и неправильным. Было принято решение начать проект заново.</p>
                        <p>Вторая версия проекта началась в ноябре 2019 года. Имея уже полученный багаж знаний и опыт
                            предущих ошибок, проект получился куда удачнее, коим и представляет собой до сих пор
                            (конечно, чисто субъективное мнение, основываясь на примерах исполнения на офф. сайте
                            React). Честно говоря, стоит отметить, что один раз был масштабный перевод всего проекта на
                            typescript, что отняло немало времени и терпения, но всё же к третьему этапу создания это
                            относить я не буду. </p>
                        <p>На момент написания текста, а именно июль 2020 года, разработка сайта всё еще ведётся
                            постепенно, когда на него находится свободное время. На данный момент в нем уже
                            реализовано:</p>
                        <ul>
                            <li>Новостные посты</li>
                            <li>Комментарии к постам с возможностью оценки и управления ими</li>
                            <li>Поиск по новостным постам</li>
                            <li>Аутентификация</li>
                            <li>Панель администрации для управления содержимым сайта</li>
                            <li>Профили пользователей</li>
                            <li>Сервис сообщений между пользователями</li>
                        </ul>
                        <p>Список будет пополняться по мере наполнения головы фантазией того, что еще можно
                            сюда пристроить. Особенности реализации можно увидеть на странице
                            <NavLink to="/technologies"> технологий</NavLink>.
                        </p>
                        <p>Спасибо всем тем, кто уделил этой истории свое время и прочитал текст до
                            конца! &#128521;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History