import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, MoreVertical, Download, Eye, Calendar, User } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import FilterDropdown from './FilterDropdown';
import AddModal from './AddModal';

const Documents: React.FC = () => {
  const classes = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [showAddModal, setShowAddModal] = useState(false);

  const documents = [
    {
      id: '1',
      name: 'Safety Protocol Manual 2024',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-01-15',
      facility: 'Manufacturing Plant A',
      category: 'Safety',
      status: 'approved',
      downloads: 45
    },
    {
      id: '2',
      name: 'Equipment Maintenance Log',
      type: 'XLSX',
      size: '1.8 MB',
      uploadedBy: 'Maria Garcia',
      uploadDate: '2024-01-14',
      facility: 'Distribution Center East',
      category: 'Maintenance',
      status: 'pending',
      downloads: 23
    },
    {
      id: '3',
      name: 'Environmental Impact Report',
      type: 'PDF',
      size: '5.2 MB',
      uploadedBy: 'David Chen',
      uploadDate: '2024-01-12',
      facility: 'Research & Development Lab',
      category: 'Environmental',
      status: 'approved',
      downloads: 67
    },
    {
      id: '4',
      name: 'Quality Control Checklist',
      type: 'DOC',
      size: '890 KB',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-01-10',
      facility: 'Manufacturing Plant A',
      category: 'Quality',
      status: 'draft',
      downloads: 12
    },
    {
      id: '5',
      name: 'Training Materials - Q1 2024',
      type: 'PPT',
      size: '12.5 MB',
      uploadedBy: 'Michael Brown',
      uploadDate: '2024-01-08',
      facility: 'All Facilities',
      category: 'Training',
      status: 'approved',
      downloads: 89
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase();
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
  };

  const getFileIcon = (type: string) => {
    const iconClass = "h-8 w-8";
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'doc':
      case 'docx':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
      case 'xls':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'ppt':
      case 'pptx':
        return <FileText className={`${iconClass} text-orange-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${classes.textPrimary}`}>Documents</h1>
          <p className={`${classes.textSecondary} mt-1`}>Manage and organize all facility documents</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Documents</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>1,247</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <FileText className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Approved</p>
              <p className="text-2xl font-bold text-green-500">1,156</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">67</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <FileText className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
        <div className={`${classes.cardBg} p-6 rounded-xl shadow-sm border ${classes.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${classes.textSecondary}`}>Total Downloads</p>
              <p className={`text-2xl font-bold ${classes.textPrimary}`}>8,432</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <Download className={`h-6 w-6 ${classes.iconColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      {/* Documents List */}
      <div className={`${classes.cardBg} rounded-xl shadow-sm border ${classes.border} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${classes.tableHeader} border-b ${classes.border}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Document</span>
                    <button 
                      onClick={(e) => handleFilterClick('document', e)}
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
                    <span>Category</span>
                    <button 
                      onClick={(e) => handleFilterClick('category', e)}
                      className={`p-1 ${classes.hoverBg} rounded`}
                    >
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${classes.tableHeaderText} uppercase tracking-wider`}>
                  <div className="flex items-center space-x-2">
                    <span>Uploaded By</span>
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
                    <span>Downloads</span>
                    <button 
                      onClick={(e) => handleFilterClick('downloads', e)}
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
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className={`${classes.tableRow} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium ${classes.textPrimary} truncate`}>{doc.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${classes.textMuted}`}>{doc.type}</span>
                          <span className={`text-xs ${classes.textMuted}`}>•</span>
                          <span className={`text-xs ${classes.textMuted}`}>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${classes.textPrimary}`}>{doc.facility}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User className={`h-4 w-4 ${classes.textMuted}`} />
                      <div>
                        <p className={`text-sm ${classes.textPrimary}`}>{doc.uploadedBy}</p>
                        <div className="flex items-center space-x-1">
                          <Calendar className={`h-3 w-3 ${classes.textMuted}`} />
                          <span className={`text-xs ${classes.textMuted}`}>{doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'approved' 
                        ? classes.statusActive
                        : doc.status === 'pending'
                        ? classes.statusWarning
                        : classes.statusInactive
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${classes.textPrimary}`}>{doc.downloads}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className={`p-1 ${classes.hoverBg} rounded transition-colors`}>
                        <Eye className={`h-4 w-4 ${classes.textMuted}`} />
                      </button>
                      <button className={`p-1 ${classes.hoverBg} rounded transition-colors`}>
                        <Download className={`h-4 w-4 ${classes.textMuted}`} />
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
        type={activeFilter === 'user' ? 'user' : activeFilter === 'status' ? 'select' : 'text'}
        options={activeFilter === 'status' ? ['approved', 'pending', 'draft'] : []}
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
        type="document"
      />
    </>
  );
};

export default Documents;