import React, { useState } from 'react';

//Import Views
import { Dashboard } from './../Views/Dashboard'
import { MyDeployments } from './../Views/MyDeployments'
import { AllDeployments } from './../Views/AllDeployments'

//Import Components
import { Sidebar } from './../Components/Sidebar'

export const Main = ({show}) => {
  const [activeTab, setActiveTab] = useState(show ? show : 'Dashboard');

  let view;

  switch (activeTab) {
    case 'My Deployments':
      view = <MyDeployments />;
      break;
    case 'All Deployments':
      view = <AllDeployments />;
      break;
    default:
      view = <Dashboard />;
  }

  return (
        <div className="max-w-7xl mx-auto px-4 flex-grow flex mt-8">
          <Sidebar activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)}/>
          { view }
        </div>
  );
}