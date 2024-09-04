import React, { useState, useEffect, useContext } from 'react';

import { userDeployments } from './../Services/server'
import AccountsContext from '../Context/Accounts';

import { DeploymentCard } from '../Components/DeploymentCard';

export const MyDeployments = () => {
    const { selectedAccount } = useContext(AccountsContext)
    const [userDeploymentsList, setUserDeployments] = useState([])

    useEffect(() => {
        const getuserDeployments = async () => {
            const _userDeploymentsList = await userDeployments(selectedAccount.address);
            setUserDeployments(_userDeploymentsList.data)
        }

        if(!userDeploymentsList.length && selectedAccount){
            getuserDeployments()
        }

        const intervalId = setInterval(() => {
            getuserDeployments()
          }, 1000 * 2) // in milliseconds
          return () => clearInterval(intervalId)
    },[selectedAccount])

    return (
      <main className="flex-1 min-v-screen space-y-8 min-100">
        <div className="max-w-7xl mx-auto">
            {
                !selectedAccount ? <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">Please connect Wallet</h1>
                : !userDeploymentsList.length ? <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">No Deployment history</h1>
                :
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {userDeploymentsList.length && userDeploymentsList.map((deployment) => (
                            <DeploymentCard key={deployment.ext_id} {...deployment} />
                        ))}
                    </div>
            }
      </div>
      </main>
    );
}