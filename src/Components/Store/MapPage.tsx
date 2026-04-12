"use client"
import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { StoresType } from './StoresType';

type Props = {
    filteredStores: StoresType[]
    isDark: boolean;
    PRIMARY_COLOR: string;
}
const MapComponent = ({ stores, isDark, PRIMARY_COLOR }: any) => {
    useEffect(() => {
        const L = window.L;
        if (!L) return;

        const map = L.map('map-container', { zoomControl: false })
            .setView([-6.215, 106.820], 14);

        const tileUrl = isDark
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

        L.tileLayer(tileUrl).addTo(map);

        const customIcon = L.divIcon({
            html: `<div style="background-color: ${PRIMARY_COLOR}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid ${isDark ? '#18181b' : 'white'}; display: flex; align-items: center; justify-content: center;"><div style="transform: rotate(45deg); width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
            className: 'custom-div-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        stores.forEach((store: any) => {
            L.marker([store.lat, store.lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<div style="color: ${isDark ? '#fff' : '#000'};"><strong>${store.name}</strong></div>`);
        });

        return () => {
            map.remove(); // ✅ aman
        };
    }, [stores, isDark, PRIMARY_COLOR]);
    return <div id="map-container" className="z-10 h-full w-full rounded-[2.5rem] overflow-hidden" />;
};
function MapPage({ filteredStores, isDark, PRIMARY_COLOR }: Props) {
    return (
        <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-250px)] pb-10">
            <MapComponent stores={filteredStores} isDark={isDark} PRIMARY_COLOR={PRIMARY_COLOR} />
        </motion.div>
    )
}

export default MapPage