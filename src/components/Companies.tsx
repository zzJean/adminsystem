import React, { useState } from 'react';
import { Building2, Plus, Search, Filter, MoreVertical, MapPin, Users, Calendar, Eye } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import FilterDropdown from './FilterDropdown';
import AddModal from './AddModal';

const Companies: React.FC = () => {
  const classes = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [showAddModal, setShowAddModal] = useState(false);

  const companies = [
    {
      id: '1',
      name: 'Acme Industrial Corp',
      location: 'New York, NY',
      facilities: 12,
      employees: 450,
      status: 'active',
      lastActivity: '2 hours ago',
      type: 'Manufacturing',
      revenue: '$2.4M'
    },
    {
      id: '2',
      name: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      facilities: 8,
      employees: 320,
      status: 'active',
      lastActivity: '5 hours ago',
      type: 'Technology',
      revenue: '$1.8M'
    },
    {
      id: '3',
      name: 'Global Energy Systems',
      location: 'Houston, TX',
      facilities: 25,
      employees: 890,
      status: 'active',
      lastActivity: '1 day ago',
      type: 'Energy',
      revenue: '$5.2M'
    },
    {
      id: '4',
      name: 'Metro Construction Ltd',
      location: 'Chicago, IL',
      facilities: 6,
      employees: 180,
      status: 'inactive',
      lastActivity: '3 days ago',
      type: 'Construction',
      revenue: '$980K'
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (filterType: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const handleFilter = (value: string) => {
    console.log(`Filtering ${activeFilter} by:`, value);
    // Implement actual filtering logic here
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${classes.textPrimary}`}>Companies</h1>
          <p className={`${classes.textSecondary} mt-1`}>Manage and monitor all registered companies</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Companies</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>113</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Building2 className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Active</p>
              <p className="text-2xl font-bold text-green-500">109</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Facilities</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>398</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <MapPin className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Employees</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>1,840</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <Users className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {/* Companies Table */}
      <div className={`${classes.cardBg} rounded-xl shadow-sm border ${classes.border} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${classes.tableHeader} border-b ${classes.border}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Company</span>
                    <button 
                      onClick={(e) => handleFilterClick('company', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Location</span>
                    <button 
                      onClick={(e) => handleFilterClick('location', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Facilities</span>
                    <button 
                      onClick={(e) => handleFilterClick('facilities', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Employees</span>
                    <button 
                      onClick={(e) => handleFilterClick('employees', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Revenue</span>
                    <button 
                      onClick={(e) => handleFilterClick('revenue', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Status</span>
                    <button 
                      onClick={(e) => handleFilterClick('status', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${classes.border}`}>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className={`${classes.tableRow} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${classes.hoverBg} rounded-lg flex items-center justify-center`}>
                        <Building2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${classes.textPrimary}`}>{company.name}</p>
                        <p className={`text-xs ${classes.textMuted}`}>{company.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className={`h-4 w-4 ${classes.textMuted}`} />
                      <span className={`text-sm ${classes.textPrimary}`}>{company.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${classes.textPrimary}`}>{company.facilities}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${classes.textPrimary}`}>{company.employees}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${classes.textPrimary}`}>{company.revenue}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.status === 'active' 
                        ? classes.statusActive
                        : classes.statusInactive
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className={`p-1 ${classes.hoverBg} rounded transition-colors`}>
                        <Eye className={`h-4 w-4 ${classes.textMuted}`} />
                      </button>
                      <button className={`p-1 ${classes.hoverBg} rounded transition-colors`}>
                        <MoreVertical className={`h-4 w-4 ${classes.textMuted}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Filter Dropdown */}
      <FilterDropdown
        type={activeFilter === 'status' ? 'select' : 'text'}
        options={activeFilter === 'status' ? ['active', 'inactive'] : []}
        onFilter={handleFilter}
        placeholder={`Filter by ${activeFilter}...`}
        isOpen={activeFilter !== null}
        onClose={() => setActiveFilter(null)}
        position={filterPosition}
      />

      {/* Add Modal */}
      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="company"
      />
    </>
  );
};

export default Companies;