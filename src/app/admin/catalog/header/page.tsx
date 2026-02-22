import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import HeaderComponent from './Components/HeaderComponent'

type Props = {}

function HeaderPage({ }: Props) {
    return (
        <MainLayout>
            <HeaderComponent />
        </MainLayout>
    )
}

export default HeaderPage