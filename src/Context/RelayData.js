//Dependencies
import React, { createContext, useState, useEffect, useContext } from 'react';

//Import API Calls
import { getNextFreeParaId } from './../Api/getters_relay'

//Import Context
import ApiContext from './ApiConnect'

const RelayDataContext = createContext();
export default RelayDataContext;

export function RelayData ({ children }) {
    // CONTEXT
    const { westendApi } = useContext(ApiContext)
    
    //STATE
    const [nextFreeParaId, setNextFreeParaId] = useState(null);

    useEffect(() => {
        const getStorage = async () => {
          const _nextFreeParaId = await getNextFreeParaId(westendApi)
          setNextFreeParaId(_nextFreeParaId)
        }
        if (westendApi) {
            getStorage();
        }
    },[westendApi])


    return (
        <RelayDataContext.Provider value={{nextFreeParaId}}>
            { children }
        </RelayDataContext.Provider>
    );
}