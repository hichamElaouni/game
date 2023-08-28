import { Button } from '@material-ui/core'
import React from 'react'

export default function CardPricing(props) {

    const { color, title, price, options } = props

    return (
        <div className='cardPricing' style={{ borderColor: color }}>
            <h1>{title}</h1>
            <h2>{price}</h2>
            <ul className='optionsCard'>
                {
                    options.map((option, key) => {
                        return (
                            <li key={key}>
                                {option}
                            </li>
                        )
                    })
                }
            </ul>

            <Button style={{ background: color }} >Buy Now </Button>
        </div >
    )
}