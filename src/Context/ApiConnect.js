//Dependencies
import React, { createContext, useState, useEffect } from 'react';
import { createClient } from "polkadot-api"
import { WebSocketProvider } from "polkadot-api/ws-provider/web"
import { wnd } from "@polkadot-api/descriptors"
import { wndcoretime } from "@polkadot-api/descriptors"

const ApiContext = createContext();
export default ApiContext;

export function ApiConnect ({ children }) {
    
    const [westendApi, setWestendApi] = useState(null)
    const [westendCoretimeApi, setWestendCoretimeApi] = useState(null)

    useEffect(() =>{
        const startApi = async () => {
            await init();
        }
        if(!westendApi){
            startApi();
        }
    })

    const init = async () => {
        const clientwestend = createClient(WebSocketProvider("wss://westend-rpc.polkadot.io"))
        const clientwestendcoretime = createClient(WebSocketProvider("wss://sys.ibp.network/coretime-westend"))
        const _westendApi = await clientwestend.getTypedApi(wnd)
        const _westendCoretimeApi = await clientwestendcoretime.getTypedApi(wndcoretime)
        setWestendApi(_westendApi)
        setWestendCoretimeApi(_westendCoretimeApi)
    }

    return (
        <ApiContext.Provider value={{westendApi, westendCoretimeApi}}>
            { children }
        </ApiContext.Provider>
    );
}