import React from "react";
import { ChevronDown, Wallet } from 'lucide-react';
import { shortenAdd } from './../Utils/shorten-address'



export const Header = ({ setIsModalOpen, selectedAccount }) => {
    return (
        <header className="pt-4 pb-4">
            <div className="mx-auto max-w-7xl px-4">
              <div className="bg-white rounded-2xl py-4 px-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="font-semibold text-lg text-gray-800">PDP</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 rounded-2xl px-3 py-2 transition-colors duration-200 bg-white border border-gray-200 hover:bg-gray-50"
                >
                  <Wallet size={16} className="text-[#E6007A]" />
                  <span className="text-gray-800">{selectedAccount ? `Connected: ${shortenAdd(selectedAccount.address,3,3)}` : 'Connect Wallet'}</span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
        </header>
    )

}