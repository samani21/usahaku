"use client"
import React, { useEffect, useRef } from 'react'
import { StoresType } from '@/types/StoresType';
import { UserLocationType } from './StoresType';
type Props = {
    stores: StoresType[]
    isDark: boolean;
    PRIMARY_COLOR: string;
    userLocation: UserLocationType | null;
    selectedStore: StoresType | null;
    setSelectedStore: (store: StoresType) => void;
}

const MapComponent = ({
    stores,
    isDark,
    PRIMARY_COLOR,
    userLocation,
    selectedStore,
    setSelectedStore
}: Props) => {

    const mapRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);
    const storeMarkersRef = useRef<any[]>([]);
    const routeRef = useRef<any>(null);

    // ✅ INIT + RENDER STORE
    useEffect(() => {
        const L = window.L;
        if (!L) return;

        if (!mapRef.current) {
            mapRef.current = L.map('map-container', { zoomControl: false })
                .setView([-6.215, 106.820], 14);

            const tileUrl = isDark
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

            L.tileLayer(tileUrl).addTo(mapRef.current);
        }

        const map = mapRef.current;

        // clear store marker
        storeMarkersRef.current.forEach(m => map.removeLayer(m));
        storeMarkersRef.current = [];

        const storeIcon = L.divIcon({
            html: `
            <div style="
                background-color: ${PRIMARY_COLOR};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid ${isDark ? '#18181b' : 'white'};
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    transform: rotate(45deg);
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                "></div>
            </div>
            `,
            className: '',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        stores.forEach(store => {
            const marker = L.marker([store.lat, store.lng], { icon: storeIcon })
                .addTo(map)
                .on('click', () => setSelectedStore(store));

            storeMarkersRef.current.push(marker);
        });

    }, [stores, isDark, PRIMARY_COLOR]);

    // ✅ USER MARKER
    useEffect(() => {
        const L = window.L;
        if (!L || !userLocation || !mapRef.current) return;

        const map = mapRef.current;
        const latlng: [number, number] = [userLocation.lat, userLocation.lng];

        const userIcon = L.divIcon({
            html: `
            <div style="position: relative; width: 20px; height: 20px;">
                <div style="
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: ${PRIMARY_COLOR};
                    border-radius: 50%;
                    box-shadow: 0 0 0 10px ${PRIMARY_COLOR}33;
                "></div>
                <div style="
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid white;
                "></div>
            </div>
            `,
            className: '',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        if (!userMarkerRef.current) {
            userMarkerRef.current = L.marker(latlng, { icon: userIcon })
                .addTo(map);

            map.flyTo(latlng, 15);
        } else {
            userMarkerRef.current.setLatLng(latlng);
        }

    }, [userLocation, PRIMARY_COLOR]);

    // ✅ ROUTE (garis)
    useEffect(() => {
        const initRouting = async () => {
            const L: any = window.L;
            if (!L) return;

            // ⬇️ load setelah leaflet ada
            await import('leaflet-routing-machine');

            if (!selectedStore || !userLocation || !mapRef.current) return;

            const map = mapRef.current;

            if (routeRef.current) {
                map.removeControl(routeRef.current);
            }

            const userLatLng = L.latLng(userLocation.lat, userLocation.lng);
            const storeLatLng = L.latLng(selectedStore.lat, selectedStore.lng);

            routeRef.current = L.Routing.control({
                waypoints: [userLatLng, storeLatLng],
                lineOptions: {
                    styles: [{ color: PRIMARY_COLOR, weight: 5 }]
                },
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                show: false,
                createMarker: () => null
            }).addTo(map);
        };

        initRouting();
    }, [selectedStore, userLocation]);

    return (
        <div
            id="map-container"
            className="z-10 h-full w-full rounded-[2.5rem] overflow-hidden"
        />
    );
};

export default MapComponent;