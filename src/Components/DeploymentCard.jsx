import React from 'react';
import { ExternalLink, Activity, Hash, Coins, Cog } from 'lucide-react';

import truncateUUID from './../Services/uuid-trunc'


export const DeploymentCard = ({name, status, para_id, ext_id, url, runtime, token}) => {
  
    const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return {color:'bg-green-500', name:"Running"};
      case 3:
        return {color: 'bg-red-500', name: "Stopped"};
      case 1:
        return {color: 'bg-yellow-500', name: "In Progress"};
      case 0:
        return {color: 'bg-blue-500', name: "In Queue"};
      default:
        return {color: 'bg-gray-500', name: "NA"};
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-transparent bg-clip-text">
            {name}
          </h3>
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${getStatusColor(status).color}`}></span>
            <span className="ml-2 text-xs font-semibold text-gray-600">{getStatusColor(status).name}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Activity className="w-4 h-4 mr-2 text-[#E6007A]" />
            <span className="text-sm text-gray-700">Para ID: {para_id}</span>
          </div>
          <div className="flex items-center">
            <Hash className="w-4 h-4 mr-2 text-[#6D3AEE]" />
            <span className="text-sm text-gray-700">ID: {truncateUUID(ext_id)}</span>
          </div>
          <div className="flex items-center">
            <Cog className="w-4 h-4 mr-2 text-[##5b5b5b]" />
            <span className="text-sm text-gray-700">Runtime: {runtime}</span>
          </div>
          <div className="flex items-center">
            <Coins className="w-4 h-4 mr-2 text-[#E6007A]" />
            <span className="text-sm text-gray-700">Token: {token}</span>
          </div>
        </div>
      </div>
      {
        (status === 1 || status === 2) ?
        <div className="px-4 py-3 bg-gray-50">
            <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 px-4 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] text-white text-center rounded-md hover:from-[#D5006E] hover:to-[#5C29DD] transition-colors duration-200 flex items-center justify-center"
            >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Explorer
            </a>
        </div>
        : <></>
      }
    </div>
  );
}