'use client';

import React, { useState, ReactNode } from 'react';

type Tab = 'Notes' | 'Notices';

interface DashboardTabsProps {
  notesSection: ReactNode;
  noticesSection: ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ notesSection, noticesSection }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Notes');

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('Notes')}
            className={`${
              activeTab === 'Notes'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('Notices')}
            className={`${
              activeTab === 'Notices'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200`}
          >
            Notices
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'Notes' && notesSection}
        {activeTab === 'Notices' && noticesSection}
      </div>
    </div>
  );
};

export default DashboardTabs;