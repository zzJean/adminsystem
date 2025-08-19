import React, { useState } from 'react';
import { X, Building2, Factory, FileText, Users } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'company' | 'facility' | 'document' | 'user';
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, type }) => {
  const classes = useThemeClasses();
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const getModalConfig = () => {
    switch (type) {
      case 'company':
        return {
          title: 'Add New Company',
          icon: <Building2 className="h-6 w-6 text-white" />,
          fields: [
            { name: 'name', label: 'Company Name', type: 'text', required: true },
            { name: 'location', label: 'Location', type: 'text', required: true },
            { name: 'type', label: 'Industry Type', type: 'select', options: ['Manufacturing', 'Technology', 'Energy', 'Construction'] },
            { name: 'revenue', label: 'Annual Revenue', type: 'text' },
            { name: 'employees', label: 'Number of Employees', type: 'number' }
          ]
        };
      case 'facility':
        return {
          title: 'Add New Facility',
          icon: <Factory className="h-6 w-6 text-white" />,
          fields: [
            { name: 'name', label: 'Facility Name', type: 'text', required: true },
            { name: 'company', label: 'Company', type: 'select', options: ['Acme Industrial Corp', 'TechFlow Solutions', 'Global Energy Systems'] },
            { name: 'location', label: 'Location', type: 'text', required: true },
            { name: 'type', label: 'Facility Type', type: 'select', options: ['Manufacturing', 'Distribution', 'R&D', 'Storage'] },
            { name: 'capacity', label: 'Capacity (%)', type: 'number' }
          ]
        };
      case 'document':
        return {
          title: 'Upload New Document',
          icon: <FileText className="h-6 w-6 text-white" />,
          fields: [
            { name: 'name', label: 'Document Name', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'select', options: ['Safety', 'Maintenance', 'Environmental', 'Quality', 'Training'] },
            { name: 'facility', label: 'Facility', type: 'select', options: ['Manufacturing Plant A', 'Distribution Center East', 'All Facilities'] },
            { name: 'file', label: 'File', type: 'file', required: true }
          ]
        };
      case 'user':
        return {
          title: 'Add New User',
          icon: <Users className="h-6 w-6 text-white" />,
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'role', label: 'Role', type: 'select', options: ['Administrator', 'Supervisor', 'Engineer', 'Quality Manager', 'Operator'] },
            { name: 'company', label: 'Company', type: 'select', options: ['Acme Industrial Corp', 'TechFlow Solutions', 'Global Energy Systems'] },
            { name: 'facility', label: 'Facility', type: 'select', options: ['Manufacturing Plant A', 'Distribution Center East', 'Research & Development Lab'] }
          ]
        };
      default:
        return { title: '', icon: null, fields: [] };
    }
  };

  const config = getModalConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-md ${classes.cardBg} rounded-2xl border ${classes.border} shadow-2xl overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                {config.icon}
              </div>
              <h2 className="text-xl font-bold text-white">{config.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className={`block text-sm font-medium ${classes.textSecondary} mb-2`}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full px-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className={`w-full px-3 py-2 border ${classes.inputBg} ${classes.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${classes.inputPlaceholder}`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                />
              )}
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {type === 'document' ? 'Upload' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 ${classes.hoverBg} ${classes.textSecondary} py-3 px-4 rounded-lg transition-colors font-medium border ${classes.border}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;