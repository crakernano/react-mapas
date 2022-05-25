import React, {useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';


import '../index.css'



const puntoInicial = {
    lng: 5, 
    lat: 34, 
    zoom: 2
}



export const MapaPage = () => {
    const {setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizaPosicion} = useMapbox(puntoInicial);
    const {socket} = useContext(SocketContext)

    //escuchar marcadores existentes     
    useEffect(() => {
        socket.on('marcadores-activos', ( marcadores ) => {
            for( const key of Object.keys(marcadores)){
                console.log(marcadores[key]);
                agregarMarcador(marcadores[key], key);
            }
        })
    }, [socket, agregarMarcador])
    
    //Nuevo Marcador
    
    useEffect(() => {
        console.log("-> nuevo marcador");
        nuevoMarcador$.subscribe(marcador => {
            console.log(marcador);
            socket.emit('marcador-nuevo', marcador);
        });
    }, [nuevoMarcador$, socket])
    
    // Escuchar nuevos marcadores
    useEffect(() => {
        
        socket.on('marcador-nuevo', ( marcador ) => {
            agregarMarcador( marcador, marcador.id );
        });

    }, [socket, agregarMarcador])
    
    //Movimiento del marcador

    useEffect(() => {
        movimientoMarcador$.subscribe(marcador=>{
            //console.log(marcador);
            socket.emit('marcador-actualizado', marcador);

        });
    }, [movimientoMarcador$, socket])

    useEffect(() => {
        socket.on('marcador-actualizado', ( marcador ) => {
            actualizaPosicion( marcador )            
        })
    }, [actualizaPosicion, socket])

    return (
        <>
            <div
            className='info'
            >
                Lng: {coords.lng} | Lat: {coords.lat} | zoom: { coords.zoom }
            </div>
            <div 
            ref={ setRef }
            className='mapContainer'            
            />                        
        </>
    )
}
