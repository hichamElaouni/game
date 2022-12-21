import React from 'react'
import Choices from '../../Choice/Choices'

export default function Filter(props) {
    const { dataFilter, onClick } = props;

    return (
        <div className="Filter">
            {dataFilter.map((data, key) => {
                return (
                    <Choices key={key} type="checkbox" data={data.name} value={data.id} onClick={onClick} />
                )
            })}
            <button onClick={() => console.log("firlter")}>Filter</button>
        </div>
    )
}


