import React, { useState } from 'react';
import { Users as UsersIcon, Plus, Search, Filter, MoreVertical, Mail, Calendar, Shield, Eye } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import FilterDropdown from './FilterDropdown';
import AddModal from './AddModal';

const Users: React.FC = () => {
  const classes = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [showAddModal, setShowAddModal] = useState(false);

  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acmeindustrial.com',
      role: 'Administrator',
      company: 'Acme Industrial Corp',
      facility: 'Manufacturing Plant A',
      status: 'active',
      lastLogin: '2 hours ago',
      joinDate: '2023-03-15',
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@techflow.com',
      role: 'Supervisor',
      company: 'TechFlow Solutions',
      facility: 'Distribution Center East',
      status: 'active',
      lastLogin: '5 hours ago',
      joinDate: '2023-06-20',
      avatar: 'MG'
    },
    {
      id: '3',
      name: 'David Chen',
      email: 'david.chen@globalenergy.com',
      role: 'Engineer',
      company: 'Global Energy Systems',
      facility: 'Research & Development Lab',
      status: 'active',
      lastLogin: '1 day ago',
      joinDate: '2023-01-10',
      avatar: 'DC'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@acmeindustrial.com',
      role: 'Quality Manager',
      company: 'Acme Industrial Corp',
      facility: 'Manufacturing Plant A',
      status: 'active',
      lastLogin: '3 hours ago',
      joinDate: '2023-08-05',
      avatar: 'SJ'
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael.brown@metroconstruction.com',
      role: 'Operator',
      company: 'Metro Construction Ltd',
      facility: 'Warehouse Complex B',
      status: 'inactive',
      lastLogin: '1 week ago',
      joinDate: '2023-11-12',
      avatar: 'MB'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'administrator':
        return 'bg-red-100 text-red-800';
      case 'supervisor':
        return 'bg-blue-100 text-blue-800';
      case 'engineer':
        return 'bg-green-100 text-green-800';
      case 'quality manager':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${classes.textPrimary}`}>Users</h1>
          <p className={`${classes.textSecondary} mt-1`}>Manage user accounts and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Users</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>3,432</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <UsersIcon className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Active Users</p>
              <p className="text-2xl font-bold text-green-500">3,237</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Administrators</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>24</p>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <Shield className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>New This Month</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>89</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <UsersIcon className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {/* Users Table */}
      <div className={`${classes.cardBg} rounded-xl shadow-sm border ${classes.border} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${classes.tableHeader} border-b ${classes.border}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>User</span>
                    <button 
                      onClick={(e) => handleFilterClick('user', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Role</span>
                    <button 
                      onClick={(e) => handleFilterClick('role', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
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
                    <span>Facility</span>
                    <button 
                      onClick={(e) => handleFilterClick('facility', e)}
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
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Last Login</span>
                    <button 
                      onClick={(e) => handleFilterClick('lastLogin', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Calendar className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${classes.border}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`${classes.tableRow} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium ${classes.textPrimary}`}>{user.name}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Mail className={`h-3 w-3 ${classes.textMuted}`} />
                          <span className={`text-xs ${classes.textMuted} truncate`}>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${classes.textPrimary}`}>{user.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${classes.textPrimary}`}>{user.facility}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? classes.statusActive
                        : classes.statusInactive
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className={`h-3 w-3 ${classes.textMuted}`} />
                      <span className={`text-sm ${classes.textMuted}`}>{user.lastLogin}</span>
                    </div>
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
        type={activeFilter === 'lastLogin' ? 'date' : activeFilter === 'user' ? 'user' : activeFilter === 'role' || activeFilter === 'status' ? 'select' : 'text'}
        options={
          activeFilter === 'role' 
            ? ['Administrator', 'Supervisor', 'Engineer', 'Quality Manager', 'Operator']
            : activeFilter === 'status'
            ? ['active', 'inactive']
            : []
        }
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
        type="user"
      />
    </>
  );
};

export default Users;