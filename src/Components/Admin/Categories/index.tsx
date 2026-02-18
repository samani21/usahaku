"use client"
import React, { useState } from 'react'
import IconAutocomplete from './IconAutocomplete'

type Props = {}

const CategoriesComponent = (props: Props) => {
    const [icon, setIcon] = useState<string>('')

    return (

        <IconAutocomplete
            value={icon}
            onChange={(val) => setIcon(val)}
        />
    )
}

export default CategoriesComponent