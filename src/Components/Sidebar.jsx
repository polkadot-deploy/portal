import React from 'react';
import { Home, TestTube, ClipboardList, MessageSquare  } from 'lucide-react';

const tabs = [
    { name: 'Dashboard', icon: Home },
    { name: 'My Deployments', icon: TestTube },
    { name: 'All Deployments', icon: ClipboardList },
];

export const Sidebar = ({activeTab, setActiveTab}) => {
    return (
        <aside className="w-56 space-y-3 mr-8">
            {tabs.map((tab) => (
            <div
                key={tab.name}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer relative ${
                activeTab === tab.name ? 'text-[#E6007A] bg-white shadow-sm' : 'text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => setActiveTab(tab.name)}
            >
                {activeTab === tab.name && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E6007A] to-[#6D3AEE] rounded-r-full"></div>
                )}
                <tab.icon size={20} />
                <span>{tab.name}</span>
            </div>
            ))}
            <div className="pt-8 space-y-3">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm">
                    <MessageSquare size={20} />
                    <span>Feedback</span>
                </div>
                {/* <div className="flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer text-gray-600 hover:text-[#E6007A] hover:bg-white hover:shadow-sm">
                    <HelpCircle size={20} />
                    <span>Support</span>
                </div> */}
            </div>
        </aside>
    )
}