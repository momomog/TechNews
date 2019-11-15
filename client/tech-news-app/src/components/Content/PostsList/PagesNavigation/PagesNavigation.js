import React from 'react';

function PagesNavigation() {
    return (
        <div className="col-lg-4 center-block">
            <nav aria-label="Page navigation example">
                <ul className="pagination pg-blue justify-content-center">
                    <li className="page-item disabled"><a className="page-link" tabIndex="-1">Назад</a></li>
                    <li className="page-item"><a className="page-link">1</a></li>
                    <li className="page-item"><a className="page-link">2</a></li>
                    <li className="page-item"><a className="page-link">3</a></li>
                    <li className="page-item"><a className="page-link">4</a></li>
                    <li className="page-item"><a className="page-link">5</a></li>
                    <li className="page-item"><a className="page-link">Вперед</a></li>
                </ul>
            </nav>
        </div>

    )
}

export default PagesNavigation;