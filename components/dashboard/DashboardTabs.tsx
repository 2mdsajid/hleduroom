'use client';

import React, { useState, ReactNode } from 'react';

// 1. Add 'Contacts' to the Tab type
type Tab = 'Notes' | 'Notices' | 'Courses' | 'Contacts' | 'MockTests';


// 2. Add 'mockTestsSection' to props
interface DashboardTabsProps {
  notesSection: ReactNode;
  noticesSection: ReactNode;
  coursesSection: ReactNode;
  contactsSection: ReactNode;
  mockTestsSection: ReactNode; 
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  notesSection,
  noticesSection,
  coursesSection,
  contactsSection, // 3. Destructure the new prop
  mockTestsSection, // 3. Destructure prop
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('Notes');

  const renderTabButton = (tabName: Tab, label: string) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`${
        activeTab === tabName
          ? 'border-blue-600 text-blue-700'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {renderTabButton('Notes', 'Notes')}
          {renderTabButton('Notices', 'Notices')}
          {renderTabButton('Courses', 'Courses')}
          {renderTabButton('Contacts', 'Contacts')}
          {renderTabButton('MockTests', 'Mock Tests')} {/* 4. Add new tab button */}
        </nav>
      </div>
      <div>
        {activeTab === 'Notes' && notesSection}
        {activeTab === 'Notices' && noticesSection}
        {activeTab === 'Courses' && coursesSection}
        {activeTab === 'Contacts' && contactsSection}
        {activeTab === 'MockTests' && mockTestsSection} {/* 5. Render new section */}
      </div>
    </div>
  );
};

export default DashboardTabs;