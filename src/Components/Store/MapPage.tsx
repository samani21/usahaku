"use client"
import { StoresType } from '@/types/StoresType';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { UserLocationType } from './StoresType';
import MapComponent from './MapComponent';

type Props = {
    stores: StoresType[]
    isDark: boolean;
    PRIMARY_COLOR: string;
    userLocation: UserLocationType | null;
}

function MapPage({ stores, isDark, PRIMARY_COLOR, userLocation }: Props) {
    const [selectedStore, setSelectedStore] = useState<StoresType | null>(null);

    return (
        <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-250px)] pb-10 relative"
        >
            <MapComponent
                stores={stores}
                isDark={isDark}
                PRIMARY_COLOR={PRIMARY_COLOR}
                userLocation={userLocation}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
            />
        </motion.div>
    )
}

export default MapPage;