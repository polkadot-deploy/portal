import React from "react";
import { ChevronRight, X, ChevronLeft } from 'lucide-react';

import wallets from './../Data/wallets.json'
import { shortenAdd } from './../Utils/shorten-address'

//TODO: this same thing, but with logos outside of 'public'
// import talismanLogo from './../public/logos/talisman-logo.jpg'
// import subwalletLogo from './../public/logos/subwallet-logo.jpeg'
// import PJSLogo from './../public/logos/polkadotjs-logo.png'

// const images = {
//   "polkadot-js": PJSLogo,
//   "talisman": talismanLogo,
//   "subwallet-js": subwalletLogo
// }

export const WalletModal = ({handleAddressSelect,setSelectedExtension, selectedAccount, selectedExtension, accounts, extensions, setIsModalOpen,handleWalletClick}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">
              {selectedAccount ? 'Wallet Connected' : 'Connect Wallet'}
            </h2>
            <button onClick={() => {
              setIsModalOpen(false);
            }} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          {selectedExtension ? (
            <div className="py-4">
              <button
                onClick={() => setSelectedExtension("")}
                className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={20} />
                <span>Back to wallet selection</span>
              </button>
              <p className="text-gray-600 mb-4">Select an address to connect:</p>
              {accounts.map((address) => (
                <button
                  key={address.address}
                  onClick={() => handleAddressSelect(address)}
                  className="w-full mb-2 py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span>{shortenAdd(address.address, 3,3)}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-4">
              <p className="text-gray-600 mb-4">Choose a wallet to connect:</p>
              {extensions && extensions.map((extension) => (
                <button
                  key={extension}
                  onClick={() => handleWalletClick(extension)}
                  className="w-full mb-2 py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img src={wallets[extension].logo} alt={wallets[extension].name[0]} className="w-6 h-6 mr-2" />
                    <span>{wallets[extension].name}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
}