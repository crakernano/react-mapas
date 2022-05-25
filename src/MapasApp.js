import React from 'react'
import { MapaPage } from './pages/MapaPage'
import './index.css'
import { SocketProvider } from './context/SocketContext'

export const MapasApp = () => {
    return (
        <SocketProvider>
            <MapaPage />
        </SocketProvider>
        

    )
}
