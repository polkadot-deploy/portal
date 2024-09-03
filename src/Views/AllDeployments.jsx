import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, TriangleAlert } from 'lucide-react';

import { allDeployments } from './../Services/server'

export const AllDeployments = () => {
    const itemsPerPage = 10;    
    
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);  
    const [allDeploymentsData, setAllDeployments] = useState([])
    
    useEffect(() => {
        const getAllDeployments = async () => {
            const _allDeployments = await allDeployments();
            setAllDeployments(_allDeployments.data)
        }

        if(!allDeploymentsData.length){
            getAllDeployments()
        }
    },[])
    
    const sortedData = [...allDeploymentsData].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.status - b.status
        } else {
            return b.status - a.status
        }
    }); 

    const paginatedData = sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );  
    
    const totalPages = Math.ceil(sortedData.length / itemsPerPage); 
    
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
      <main className="flex-1 space-y-8">
        {paginatedData && <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-3 font-medium" style={{textAlign:"start"}}>Name</th>
                  <th className="pb-3 font-medium">ParaID</th>
                  <th className="pb-3 font-medium">Runtime</th>
                  <th className="pb-3 font-medium">Token Name</th>
                  <th className="pb-3 font-medium cursor-pointer" onClick={toggleSortOrder}>
                    <div className="flex items-center">
                      Status
                      {sortOrder === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                    </div>
                  </th>
                  <th className="pb-3 font-medium">Explorer</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#E6007A] to-[#6D3AEE] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {item.name[0]}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">{item.para_id}</td>
                    <td className="py-4 text-center">{item.runtime}</td>
                    <td className="py-4 text-center">{item.token}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.status === 2 ? '#10B981' : item.status === 3 ? '#EF4444' : item.status === 1 ? '#f8dd4c' : '#3B82F6', flexShrink: 0}}></div>
                        <span>{
                            item.status === 0 ? "In Queue"
                            : item.status === 1 ? "In Progress"
                            : item.status === 2 ? "Running"
                            : "Stopped"
                        }</span>
                      </div>
                    </td>
                    <td className="py-4">
                        <div className="flex justify-center">
                            {
                                (item.status === 3 || item.status === 0) ? <div className="align-center text-blue-500 hover:text-red-700 transition-colors"><TriangleAlert size={16} /></div>
                                :(<a href={item.url} target="_blank" rel="noopener noreferrer" className="align-center text-blue-500 hover:text-blue-700 transition-colors">
                                    <ExternalLink size={16} />
                                </a>)
                            }
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} parachains</span>
            <div className="flex items-center space-x-2">
              <button 
                className="bg-gray-100 text-gray-800 rounded-lg py-2 px-4 flex items-center space-x-2 shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                className="bg-gray-100 text-gray-800 rounded-lg py-2 px-4 flex items-center space-x-2 shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>}
      </main>
    );
}