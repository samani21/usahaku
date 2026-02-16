import DashboardPage from '@/Components/Admin'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <MainLayout>
            <DashboardPage />
        </MainLayout>
    )
}