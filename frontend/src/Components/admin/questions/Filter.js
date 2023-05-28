import React from 'react'
import Choices from '../../Choice/Choices'

export default function Filter(props) {
    const { dataFilter, onClick } = props;

    return (
        <div className="Filter">
            {dataFilter.map((data, key) => {
                return (
                    <Choices key={key} type="radio" data={data.name ? data.name : data.levelNumber} value={data.id} onclick={onClick} />
                )
            })}

        </div>
    )
}


