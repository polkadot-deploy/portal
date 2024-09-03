//Import Dependencies
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Import Context
import AccountsContext from './Context/Accounts.js'

//Import Components
import { Header } from './Components/Header.jsx'
import { Footer } from './Components/Footer.jsx'
import { WalletModal } from './Components/WalletModal.jsx'

//Import Pages
import { Main } from './Pages/Main.jsx'
import { Deploy } from './Pages/Deploy.jsx'

const App = () => {
  //Context
  const { extensions, getAccounts, accounts, setSelectedExtension, selectedExtension, connectAccount, selectedAccount } = useContext(AccountsContext)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWalletClick = async (wallet) => {
    await getAccounts(wallet)
  };

  const handleAddressSelect = (address) => {
    connectAccount(address)
    setIsModalOpen(false)
  };



  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col font-sans" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300 }}>
          <Header selectedAccount={selectedAccount} setIsModalOpen={setIsModalOpen}/>
          {
            isModalOpen && <WalletModal setSelectedExtension={setSelectedExtension} selectedAccount={selectedAccount} selectedExtension={selectedExtension} handleAddressSelect={handleAddressSelect} accounts={accounts} extensions={extensions} setIsModalOpen={setIsModalOpen} handleWalletClick={handleWalletClick}/>
          }
          <div className="flex-grow">
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Main />}/>
                <Route exact path="/mydeployments" element={<Main show={"My Deployments"}/>}/>
                <Route exact path="/deploy" element={<Deploy />}/>
              </Routes>
            </BrowserRouter>
          </div>
          <Footer />
      </div>
  );
};

export default App;