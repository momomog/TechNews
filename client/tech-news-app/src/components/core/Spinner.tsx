import React from 'react'

import spinner from '../../static/spinner.svg'

interface Props {
    size?: number
}

const Spinner: React.FC<Props> = ({size = 220}: Props) => {
    return (
        <div className="d-flex justify-content-center">
            <img src={spinner}
                 width={size}
                 height={size}
                 alt="Загрузка..."/>
        </div>
    )
}

export default Spinner
