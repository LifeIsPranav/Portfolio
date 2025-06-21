
import React from 'react';

const companies = [
  { id: 1, name: "Company 1" },
  { id: 2, name: "Company 2" },
  { id: 3, name: "Company 3" },
  { id: 4, name: "Company 4" },
  { id: 5, name: "Company 5" },
  { id: 6, name: "Company 6" },
];

const CustomerLogos = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <p className="text-convrt-dark-blue/60 text-sm font-medium">TRUSTED BY LEADING COMPANIES</p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 items-center justify-items-center">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center justify-center transition-all duration-300 hover:opacity-100 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 filter grayscale opacity-60 group-hover:opacity-80 group-hover:filter-none transition-all duration-300">
              {company.name.charAt(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerLogos;
