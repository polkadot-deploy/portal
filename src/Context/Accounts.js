//Dependencies
import React, { createContext, useState, useEffect, useContext } from 'react';

import { getInjectedExtensions, connectInjectedExtension } from "polkadot-api/pjs-signer"

const AccountsContext = createContext();
export default AccountsContext;

export function Accounts ({ children }) {
    
    //STATE
    const [extensions, setExtensions] = useState([]);
    const [selectedExtension, setSelectedExtension] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [signer, setSigner] = useState(null)

    useEffect(() => {
        const _extensions = getInjectedExtensions()
        setExtensions(_extensions)
    },[])

    const getAccounts = async (wallet) => {
        const _selectedExtension = await connectInjectedExtension(wallet)
        const _accounts = _selectedExtension.getAccounts()
        setSelectedExtension(_selectedExtension)
        setAccounts(_accounts)
    }

    const connectAccount = (account) => {
        setSelectedAccount(account)
        const _signer = account.polkadotSigner
        setSigner(_signer)
    }


    return (
        <AccountsContext.Provider value={{extensions, selectedExtension, getAccounts, connectAccount, accounts, selectedAccount}}>
            { children }
        </AccountsContext.Provider>
    );
}