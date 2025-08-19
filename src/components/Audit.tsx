import React, { useState } from 'react';
import { ClipboardList, Search, Filter, Calendar, User, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import FilterDropdown from './FilterDropdown';

const Audit: React.FC = () => {
  const classes = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  const auditLogs = [
    {
      id: '1',
      action: 'Document Upload',
      user: 'John Smith',
      target: 'Safety Protocol Manual 2024',
      timestamp: '2024-01-15 14:30:25',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Uploaded new safety protocol document to Manufacturing Plant A'
    },
    {
      id: '2',
      action: 'User Login',
      user: 'Maria Garcia',
      target: 'System Access',
      timestamp: '2024-01-15 13:45:12',
      status: 'success',
      ip: '192.168.1.105',
      details: 'Successful login from Distribution Center East'
    },
    {
      id: '3',
      action: 'Permission Change',
      user: 'Admin System',
      target: 'David Chen',
      timestamp: '2024-01-15 12:20:08',
      status: 'warning',
      ip: '192.168.1.1',
      details: 'Role changed from Engineer to Senior Engineer'
    },
    {
      id: '4',
      action: 'Failed Login Attempt',
      user: 'Unknown',
      target: 'sarah.johnson@acme.com',
      timestamp: '2024-01-15 11:15:33',
      status: 'error',
      ip: '203.0.113.45',
      details: 'Multiple failed login attempts detected'
    },
    {
      id: '5',
      action: 'Document Deletion',
      user: 'Michael Brown',
      target: 'Old Training Materials',
      timestamp: '2024-01-15 10:05:17',
      status: 'warning',
      ip: '192.168.1.120',
      details: 'Deleted outdated training materials from Warehouse Complex B'
    },
    {
      id: '6',
      action: 'Facility Status Update',
      user: 'Sarah Johnson',
      target: 'Manufacturing Plant A',
      timestamp: '2024-01-15 09:30:44',
      status: 'success',
      ip: '192.168.1.110',
      details: 'Updated facility capacity from 80% to 85%'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.status === filterAction;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'error':
        return 'bg-red-100 text-red-800';
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
          <h1 className={`text-3xl font-bold ${classes.textPrimary}`}>Audit Log</h1>
          <p className={`${classes.textSecondary} mt-1`}>Monitor all system activities and user actions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Events</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>12,847</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Activity className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Today's Events</p>
              <p className="text-2xl font-bold text-green-500">156</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Warnings</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <AlertTriangle className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Critical Events</p>
              <p className="text-2xl font-bold text-red-600">7</p>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <XCircle className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {/* Audit Log Table */}
      <div className={`${classes.cardBg} rounded-xl shadow-sm border ${classes.border} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${classes.tableHeader} border-b ${classes.border}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Event</span>
                    <button 
                      onClick={(e) => handleFilterClick('event', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
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
                    <span>Target</span>
                    <button 
                      onClick={(e) => handleFilterClick('target', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Timestamp</span>
                    <button 
                      onClick={(e) => handleFilterClick('timestamp', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Calendar className="h-3 w-3" />
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
                    <span>IP Address</span>
                    <button 
                      onClick={(e) => handleFilterClick('ip', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${classes.border}`}>
              {filteredLogs.map((log) => (
                <tr key={log.id} className={`${classes.tableRow} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <p className={`text-sm font-medium ${classes.textPrimary}`}>{log.action}</p>
                        <p className={`text-xs ${classes.textMuted} mt-1`}>{log.details}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User className={`h-4 w-4 ${classes.textMuted}`} />
                      <span className={`text-sm ${classes.textPrimary}`}>{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${classes.textPrimary}`}>{log.target}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className={`h-4 w-4 ${classes.textMuted}`} />
                      <span className={`text-sm ${classes.textMuted}`}>{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-mono ${classes.textMuted}`}>{log.ip}</span>
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
        type={
          activeFilter === 'timestamp' ? 'date' 
          : activeFilter === 'user' ? 'user'
          : activeFilter === 'status' ? 'select'
          : 'text'
        }
        options={activeFilter === 'status' ? ['success', 'warning', 'error'] : []}
        onFilter={handleFilter}
        placeholder={`Filter by ${activeFilter}...`}
        isOpen={activeFilter !== null}
        onClose={() => setActiveFilter(null)}
        position={filterPosition}
      />
    </>
  );
};

export default Audit;