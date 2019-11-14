import React from 'react';
import Parser from 'html-react-parser';

function PostReview(props) {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 center-block">
                        <h2 className="mt-4">{props.post.title}</h2>
                        <div className="row">
                            <span className="col-lg-8 post-author">
                                {props.post.author}
                            </span>
                            <span className="col-lg-4 text-right text-secondary">
                                Опубликовано {props.post.publicationTime}
                            </span>
                        </div>
                        <hr/>
                        <div className="col-lg-12 mb-2">
                            <img className="card-img-top post-review-pic center-block"
                                 src={props.post.photoURL}
                                 alt="Card image"/>
                            <hr/>
                        </div>

                        <div>
                            {Parser(props.post.description)}
                        </div>

                        <hr/>

                        <div className="card my-4">
                            <h5 className="card-header">Оставьте комментарий:</h5>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="3"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Отправить
                                    </button>
                                </form>
                            </div>
                        </div>


                        <div className="media mb-4">
                            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                            <div className="media-body">
                                <h5 className="mt-0">Имя комментатора</h5>
                                Не их, а сам протокол обмена данными. Там же на самом деле много хитростей производится
                                с потоком данных для того, чтоб их можно было без ошибок на огромной частоте бродкастом
                                раздавать и принимать. То есть уже на этапе трансфера данных, без учёта шифрования и
                                деления на пакеты - уже осуществляется работа кучи сложных многоэтажных алгоритмов
                                обработки. Логично, что они могут содержать ошибки, которые и можно эксплуатировать для
                                взлома(маскируя вредоносную деятельность под эти самые ошибки, так что система их "не
                                замечает", "исправляя" штатными средствами и "пропускает" к защищённым данным)
                            </div>
                        </div>

                        <div className="media mb-4">
                            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                            <div className="media-body">
                                <h5 className="mt-0">Commenter Name</h5>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                felis in faucibus.
                                <div className="media mt-4">
                                    <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                                    <div className="media-body">
                                        <h5 className="mt-0">Commenter Name</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                        felis in faucibus.
                                    </div>
                                </div>

                                <div className="media mt-4">
                                    <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                                    <div className="media-body">
                                        <h5 className="mt-0">Commenter Name</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                        felis in faucibus.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostReview;