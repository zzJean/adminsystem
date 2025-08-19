import React, { useState } from 'react';
import { Factory, Plus, Search, Filter, MoreVertical, MapPin, Building2, Zap, Eye } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import AddModal from './AddModal';

const Facilities: React.FC = () => {
  const classes = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const facilities = [
    {
      id: '1',
      name: 'Manufacturing Plant A',
      company: 'Acme Industrial Corp',
      location: 'Detroit, MI',
      type: 'Manufacturing',
      capacity: '85%',
      status: 'active',
      employees: 120,
      lastInspection: '2024-01-15',
      energyConsumption: '2.4 MW'
    },
    {
      id: '2',
      name: 'Distribution Center East',
      company: 'TechFlow Solutions',
      location: 'Atlanta, GA',
      type: 'Distribution',
      capacity: '92%',
      status: 'active',
      employees: 85,
      lastInspection: '2024-01-10',
      energyConsumption: '1.8 MW'
    },
    {
      id: '3',
      name: 'Research & Development Lab',
      company: 'Global Energy Systems',
      location: 'Austin, TX',
      type: 'R&D',
      capacity: '67%',
      status: 'active',
      employees: 45,
      lastInspection: '2024-01-20',
      energyConsumption: '0.9 MW'
    },
    {
      id: '4',
      name: 'Warehouse Complex B',
      company: 'Metro Construction Ltd',
      location: 'Phoenix, AZ',
      type: 'Storage',
      capacity: '45%',
      status: 'maintenance',
      employees: 32,
      lastInspection: '2023-12-28',
      energyConsumption: '0.6 MW'
    }
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || facility.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${classes.textPrimary}`}>Facilities</h1>
          <p className={`${classes.textSecondary} mt-1`}>Monitor and manage all industrial facilities</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Facilities</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>398</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <Factory className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Active</p>
              <p className="text-2xl font-bold text-green-500">392</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <Factory className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Avg. Capacity</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>78%</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Zap className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Under Maintenance</p>
              <p className="text-2xl font-bold text-orange-600">6</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <Factory className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => (
          <div key={facility.id} className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border} hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${classes.hoverBg} rounded-lg flex items-center justify-center`}>
                  <Factory className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${classes.textPrimary}`}>{facility.name}</h3>
                  <p className={`text-sm ${classes.textMuted}`}>{facility.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  facility.status === 'active' 
                    ? classes.statusActive
                    : facility.status === 'maintenance'
                    ? classes.statusWarning
                    : classes.statusInactive
                }`}>
                  {facility.status}
                </span>
                <button className={`p-1 ${classes.hoverBg} rounded transition-colors`}>
                  <MoreVertical className={`h-4 w-4 ${classes.textMuted}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className={`h-4 w-4 ${classes.textMuted}`} />
                <span className={`text-sm ${classes.textSecondary}`}>{facility.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className={`h-4 w-4 ${classes.textMuted}`} />
                <span className={`text-sm ${classes.textSecondary}`}>{facility.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className={`h-4 w-4 ${classes.textMuted}`} />
                <span className={`text-sm ${classes.textSecondary}`}>{facility.energyConsumption}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${classes.textSecondary}`}>{facility.employees} employees</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${classes.textSecondary}`}>Capacity</span>
                <span className={`text-sm font-semibold ${classes.textPrimary}`}>{facility.capacity}</span>
              </div>
              <div className={`w-full ${classes.hoverBg} rounded-full h-2`}>
                <div 
                  className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: facility.capacity }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs ${classes.textMuted}`}>Last inspection: {facility.lastInspection}</span>
              <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="facility"
      />
    </div>
  );
};

export default Facilities;