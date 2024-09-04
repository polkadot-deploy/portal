import React, { useState } from "react";
import { ChevronDown, TestTube, MessageSquare, Rocket, Book, FileText, Check, Boxes, Network, Gamepad } from 'lucide-react';
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const [expandedSection, setExpandedSection] = useState('EVM');

    const sections = [
        { 
          name: 'EVM', 
          icon: Network,
          items: ['Native EVM support out of the Box', 'Decentralized bridge via Snowbridge', 'Exchanges support via Polkadot', 'Fast 6s Finality']
        },
      { 
        name: 'Gaming', 
        icon: Gamepad,
        items: ['Fast block confirmation and high TPS', 'Unreal Enging Support', 'Elastic Scalling for peak demand periods']
      },
      { 
        name: 'Defi', 
        icon: Boxes,
        items: ['Asset creation and management', 'Access to liquidity Pools via cross-chain messaging', 'Micro-blocks for micro-trasanctions', 'Low fees']
      },
    ];

    return (
        <main className="flex-1 space-y-8">
            {/* Get started section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                    <Rocket size={22} className="text-[#E6007A]" />
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 400 }}>Get started</h2>
                    </div>
                    <p className="text-sm text-gray-600">Build your Rollup on Polkadot</p>
                    <div className="flex space-x-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
                    <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">K</div>
                    <div className="w-7 h-7 bg-[#52D1FF] rounded-full flex items-center justify-center text-white text-xs font-bold">R</div>
                    </div>
                </div>
                <div className="mt-4 bg-white rounded-lg p-4 shadow-inner">
                    <Link to="/deploy">
                        <button className="w-full bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-white rounded-lg py-2 flex items-center justify-center space-x-2">
                        <Rocket size={16} />
                        <span className="font-medium">Deploy on Polkadot</span>
                        </button>
                    </Link>
                </div>
                </div>
                <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                    <TestTube size={24} className="text-[#E6007A]" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Explore Testnet</h3>
                        <p className="text-sm text-gray-600"><a target="_blank" href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fdeploypolkadot.xyz/9991#/explorer">Fully-integrated Rococo Testnet</a></p>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                    <Book size={24} className="text-[#E6007A]" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Documentation</h3>
                        <p className="text-sm text-gray-600">Tools, tutorials, and technical support</p>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                    <MessageSquare size={24} className="text-[#E6007A]" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Help me choose</h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Which parachain is right for you? section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[500px] flex flex-col justify-between">
                <div className="flex justify-between items-start z-30">
                    <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">Which parachain is right for you?</span>
                    <span className="text-sm text-gray-600 font-light">
                        Pick the parachain use case that most closely <br /> meets your needs
                    </span>
                    </div>
                </div>
                <div className="hidden md:flex flex-col gap-y-1 z-30 w-full mt-4">
                    <span className="text-base text-gray-800">Not sure?</span>
                    <span className="text-sm text-gray-600 mb-2">
                    Our team of experts will guide you <br /> through the process
                    </span>
                    <button className="w-[118px] h-[40px] bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-200 transition-colors">
                    Talk to us
                    </button>
                </div>
                </div>
                <div className="w-full flex flex-col gap-y-3">
                {sections.map((section) => (
                    <div key={section.name} className={`overflow-hidden transition-all ${expandedSection === section.name ? 'h-auto md:h-[194px]' : 'h-[74px]'}`}>
                    <div 
                        style={{
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        background: "linear-gradient(279deg, rgb(249, 250, 251) 4.83%, rgb(240, 242, 245) 100%)"
                        }}
                        className="transition-all relative w-full h-full flex-col border-[1px] border-gray-200 rounded-2xl py-4 px-2 md:px-5 gap-y-4 flex items-start justify-center cursor-pointer"
                        onClick={() => setExpandedSection(expandedSection === section.name ? '' : section.name)}
                    >
                        <div className="flex items-center justify-between gap-x-2 w-full">
                        <div className="w-full flex items-center gap-x-2">
                            <section.icon size={24} className="text-[#E6007A]" />
                            <div className="flex flex-col gap-y-0 md:gap-y-1.5">
                            <span className="font-semibold text-sm md:text-base bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">{section.name}</span>
                            </div>
                        </div>
                        </div>
                        {expandedSection === section.name ? (
                        <div className="absolute right-5 top-5 z-10">
                            <button className="w-[75px] h-[32px] bg-white text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-100 transition-colors">
                            Explore
                            </button>
                        </div>
                        ) : (
                        <div className="cursor-pointer absolute right-5 top-6">
                            <ChevronDown size={24} className="text-gray-400" />
                        </div>
                        )}
                        {expandedSection === section.name && section.items.length > 0 && (
                        <div className="flex flex-col gap-2 mt-4">
                            {section.items.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Check size={19} className="text-[#52D1FF]" />
                                <h1 className="text-gray-700 text-sm font-light">{item}</h1>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="flex md:hidden flex-col gap-y-1 z-30 w-full mt-4">
                <span className="text-base text-gray-800">Not sure?</span>
                <span className="text-sm text-gray-600 mb-2">Our team of experts will guide you through the process</span>
                <button className="w-[118px] h-[40px] bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center text-sm shadow-sm hover:bg-gray-200 transition-colors">
                Talk to us
                </button>
            </div>
            </div>

            {/* Need more information section */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
                <FileText size={24} className="text-[#E6007A]" />
                <span className="text-gray-800">Need more information or expert help?</span>
            </div>
            <div className="space-x-4">
                <button className="bg-gray-100 text-gray-800 rounded-lg py-2 px-4 flex items-center space-x-2 shadow-sm hover:bg-gray-200 transition-colors">
                <Book size={16} />
                <span>Documentation</span>
                </button>
            </div>
            </div>
        </main>
    )
}