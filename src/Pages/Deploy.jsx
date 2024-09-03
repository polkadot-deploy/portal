import React, { useState, useContext } from 'react';
import { RefreshCw, Check, SquarePlus, SquareMinus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { generateRandomName } from './../Utils/name-generator'

import runtimeData from './../Data/runtimes.json'
import deployments from './../Data/deployments.json'
import coretimes from './../Data/coretime.json'

import { deploy } from './../Services/server.js'

import AccountsContext from '../Context/Accounts.js';

export const Deploy = () => {
  const [activeInfo, setActiveInfo] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    runtime: 'parityGeneric',
    deployment: 'test',
    coretime: 'bulk',
    relayChain: 'Rococo'
  });

  const [paraName, setParaName] = useState(generateRandomName())
  const [token, setToken] = useState("SOME")

  const { selectedAccount } = useContext(AccountsContext)

  const navigate = useNavigate()

  const toggleInfo = (section) => {
    setActiveInfo(activeInfo === section ? '' : section);
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({ ...prev, [category]: option }));
  };

  const renderInfoButton = (section, isSelected) => (
    isSelected && (
      <button
        className="absolute top-1 right-1 text-[#E6007A] hover:text-[#6D3AEE] transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          toggleInfo(section);
        }}
      >
        {activeInfo === section ? <SquareMinus size={16} /> : <SquarePlus size={16} />}
      </button>
    )
  );

  const renderInfoContent = (section, content) => (
    activeInfo === section && (
      <div className="mt-2 p-2 bg-gray-100 rounded-lg text-sm col-span-full text-gray-800">
        {content}
      </div>
    )
  );

  const manageDeploy = async () => {
    const name = paraName ? paraName : generateRandomName();
    const tok = token ? token : "SOME";
    const runtime = selectedOptions.runtime
    const addr = selectedAccount ? selectedAccount.address : "0xNoAccountProvided"

    const response = await deploy({name, token: tok, runtime, addr})
    navigate("/mydeployments")

  }

  const gradientBorder = "border border-[#E6007A]";

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300 }}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="text-[#E6007A] hover:underline mb-4 inline-block">
          Cancel
        </Link>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Deploy a Polkadot Rollup</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Parachain Name, Token Name, and Chain ID */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="w-[50%] pr-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Parachain Name</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="bg-gray-50 text-gray-800 rounded-lg py-2 pl-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                      value={paraName}
                      disabled
                    />
                    <button className="absolute right-2 p-1 text-[#E6007A] hover:text-[#6D3AEE] transition-colors duration-200">
                      <RefreshCw size={20} onClick={() => setParaName(generateRandomName)}/>
                    </button>
                  </div>
                </div>
                <div className="w-[30%] px-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Token Name</label>
                  <input
                    type="text"
                    className="bg-gray-50 text-gray-800 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                    placeholder="Enter token name"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                  />
                </div>
                <div className="w-[20%] pl-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Chain ID</label>
                  <input
                    type="text"
                    className="bg-gray-50 text-gray-400 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                    placeholder="Auto-assigned"
                    disabled
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Parachain name, Token name, and Chain ID cannot be changed after deploying</p>
            </div>

            {/* Runtimes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium mb-2 text-gray-700">Rollup Runtime</label>
              <div className="grid grid-cols-3 gap-4">
                {runtimeData.map((runtime) => (
                  <div key={runtime.id} className="relative">
                    <button
                      className={`bg-gray-50 rounded-lg p-4 flex items-center space-x-2 w-full h-[60px] ${
                        selectedOptions.runtime === runtime.id ? gradientBorder : ''
                      }`}
                      onClick={() => runtime.id === "parityGeneric" ? handleOptionSelect('runtime', runtime.id) : ""}
                    >
                      <div className={`w-8 h-8 ${selectedOptions.runtime === runtime.id ? 'bg-gradient-to-r from-[#E6007A] to-[#6D3AEE]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>
                        {runtime.name[0]}
                      </div>
                      <span className="text-gray-800">{runtime.name}</span>
                      {selectedOptions.runtime === runtime.id && <Check size={16} className="ml-auto text-[#E6007A]" />}
                    </button>
                    {renderInfoButton('Runtime', selectedOptions.runtime === runtime.id)}
                  </div>
                ))}
                {renderInfoContent('Runtime', `This is information about the selected framework. It provides details on the framework's features and use cases.`)}
              </div>
            </div>

            {/* Deployment */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium mb-2 text-gray-700">Deployment Target</label>
              <div className="grid grid-cols-3 gap-4">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="relative">
                    <button
                      className={`bg-gray-50 rounded-lg p-4 flex items-center space-x-2 w-full h-[60px] ${
                        selectedOptions.deployment === deployment.id ? gradientBorder : ''
                      }`}
                      onClick={() => deployment.id === 'test' ? handleOptionSelect('deployment', deployment.id) : ""}
                    >
                      <div className={`w-8 h-8 ${selectedOptions.deployment === deployment.id ? 'bg-gradient-to-r from-[#E6007A] to-[#6D3AEE]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>
                        {deployment.name[0]}
                      </div>
                      <span className="text-gray-800">{deployment.name}</span>
                      {selectedOptions.deployment === deployment.id && <Check size={16} className="ml-auto text-[#E6007A]" />}
                    </button>
                    {renderInfoButton('Deployment', selectedOptions.deployment === deployment.id)}
                  </div>
                ))}
                {renderInfoContent('Deployment', 'This is information about the selected relay chain. It describes the characteristics and purpose of this relay chain.')}
              </div>
            </div>

            {/* Relay Chain */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium mb-2 text-gray-700">Deployment Target</label>
              <div className="grid grid-cols-3 gap-4">
                {['Polkadot', 'Kusama', 'Rococo', 'Paseo'].map((chain) => (
                  <div key={chain} className="relative">
                    <button
                      className={`bg-gray-50 rounded-lg p-4 flex items-center space-x-2 w-full h-[60px] ${
                        selectedOptions.relayChain === chain ? gradientBorder : ''
                      }`}
                      onClick={() => chain === 'Rococo' ? handleOptionSelect('relayChain', chain) : ""}
                    >
                      <div className={`w-8 h-8 ${selectedOptions.relayChain === chain ? 'bg-gradient-to-r from-[#E6007A] to-[#6D3AEE]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>
                        {chain[0]}
                      </div>
                      <span className="text-gray-800">{chain}</span>
                      {selectedOptions.relayChain === chain && <Check size={16} className="ml-auto text-[#E6007A]" />}
                    </button>
                    {renderInfoButton('Relay Chain', selectedOptions.relayChain === chain)}
                  </div>
                ))}
                {renderInfoContent('Relay Chain', 'This is information about the selected relay chain. It describes the characteristics and purpose of this relay chain.')}
              </div>
            </div>

            {/* Coretime */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium mb-2 text-gray-700">Coretime</label>
              <div className="grid grid-cols-2 gap-4">
                {coretimes.map((coretime) => (
                  <div key={coretime.id} className="relative">
                    <button
                      className={`bg-gray-50 rounded-lg p-4 flex items-center space-x-2 w-full h-[60px] ${
                        selectedOptions.coretime === coretime.id ? gradientBorder : ''
                      }`}
                      onClick={() => coretime.id === 'bulk' ? handleOptionSelect('coretime', coretime.id) : ""}
                    >
                      <div className={`w-8 h-8 ${selectedOptions.coretime === coretime.id ? 'bg-gradient-to-r from-[#E6007A] to-[#6D3AEE]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>
                        {coretime.name[0]}
                      </div>
                      <span className="text-gray-800">{coretime.name}</span>
                      {selectedOptions.coretime === coretime.id && <Check size={16} className="ml-auto text-[#E6007A]" />}
                    </button>
                    {renderInfoButton('Coretime', selectedOptions.coretime === coretime.id)}
                  </div>
                ))}
                {renderInfoContent('Coretime', 'This is information about the selected consensus mechanism. It explains how this mechanism works and its advantages.')}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold mb-4 text-gray-800">What's included in your rollup</h2>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Parachain on {selectedOptions.relayChain}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">{runtimeData.filter(r => r.id === selectedOptions.runtime)[0].name} Runtime</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">1-Click deployment on {deployments.filter(d => d.id === selectedOptions.deployment)[0].name} Infrastructure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Decentralized Bridge to Etheruem via Snowbridge</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Exchange support through Polkadot's AssetHub</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">24/7 support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Block explorer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Cross-chain messaging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check size={16} className="text-[#52D1FF]" />
                  <span className="text-gray-700">Pre-allocated Polkadot core in {coretimes.filter(c => c.id === selectedOptions.coretime)[0].name}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Test Deployment</span>
                <span className="text-[#52D1FF]">FREE</span>
              </div>
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-700">Time to deploy</span>
                <span className="text-gray-600">~30 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Plan</span>
                <span className="text-gray-600">$99 /month</span>
              </div>
              <div className="pt-4">
                <input
                  type="text"
                  className="bg-gray-50 text-gray-800 rounded-l-lg py-2 px-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                  placeholder="Add promo code"
                />
                <button className="bg-[#E6007A] text-white rounded-r-lg py-2 px-4 w-1/4">Apply</button>
              </div> */}
            </div>

            <button onClick={manageDeploy} className="w-full bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-white rounded-lg py-3 font-medium shadow-sm">
              Deploy
            </button>
            {/* <button className="w-full bg-gray-200 text-gray-800 rounded-lg py-3 font-medium shadow-sm hover:bg-gray-300 transition-colors">
              Let's talk
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}