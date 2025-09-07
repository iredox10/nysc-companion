'use client';

import { useState } from 'react';
import { FaTimes, FaHome, FaUtensils, FaBus, FaMedkit, FaShoppingBag, FaFilm, FaBuilding, FaGraduationCap, FaCar, FaHammer, FaPalette } from 'react-icons/fa';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: any) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'FaBuilding',
    color: 'bg-blue-500',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Available icons
  const availableIcons = [
    { value: 'FaHome', label: 'Home', icon: FaHome },
    { value: 'FaUtensils', label: 'Restaurant', icon: FaUtensils },
    { value: 'FaBus', label: 'Transportation', icon: FaBus },
    { value: 'FaMedkit', label: 'Healthcare', icon: FaMedkit },
    { value: 'FaShoppingBag', label: 'Shopping', icon: FaShoppingBag },
    { value: 'FaFilm', label: 'Entertainment', icon: FaFilm },
    { value: 'FaBuilding', label: 'Business', icon: FaBuilding },
    { value: 'FaGraduationCap', label: 'Education', icon: FaGraduationCap },
    { value: 'FaCar', label: 'Automotive', icon: FaCar },
    { value: 'FaHammer', label: 'Services', icon: FaHammer }
  ];

  // Available colors
  const availableColors = [
    { value: 'bg-blue-500', label: 'Blue', preview: 'bg-blue-500' },
    { value: 'bg-red-500', label: 'Red', preview: 'bg-red-500' },
    { value: 'bg-green-500', label: 'Green', preview: 'bg-green-500' },
    { value: 'bg-yellow-500', label: 'Yellow', preview: 'bg-yellow-500' },
    { value: 'bg-purple-500', label: 'Purple', preview: 'bg-purple-500' },
    { value: 'bg-pink-500', label: 'Pink', preview: 'bg-pink-500' },
    { value: 'bg-indigo-500', label: 'Indigo', preview: 'bg-indigo-500' },
    { value: 'bg-orange-500', label: 'Orange', preview: 'bg-orange-500' },
    { value: 'bg-teal-500', label: 'Teal', preview: 'bg-teal-500' },
    { value: 'bg-gray-500', label: 'Gray', preview: 'bg-gray-500' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    if (!formData.icon) {
      newErrors.icon = 'Please select an icon';
    }

    if (!formData.color) {
      newErrors.color = 'Please select a color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Generate a unique ID (in a real app, this would be handled by the backend)
      const categoryId = `cat_${Date.now()}`;
      
      const newCategory = {
        $id: categoryId,
        name: formData.name.trim(),
        icon: formData.icon,
        color: formData.color,
        description: formData.description.trim(),
        createdAt: new Date().toISOString()
      };

      await onSubmit(newCategory);
      
      // Reset form
      setFormData({
        name: '',
        icon: 'FaBuilding',
        color: 'bg-blue-500',
        description: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedIcon = () => {
    const selected = availableIcons.find(icon => icon.value === formData.icon);
    return selected ? selected.icon : FaBuilding;
  };

  if (!isOpen) return null;

  const SelectedIcon = getSelectedIcon();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <FaPalette className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Category</h2>
                <p className="text-white/80">Create a new listing category</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
            <div className="text-sm font-medium text-gray-600 mb-3">Preview</div>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${formData.color} rounded-2xl flex items-center justify-center`}>
                <SelectedIcon className="text-2xl text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">
                  {formData.name || 'Category Name'}
                </div>
                <div className="text-gray-500 text-sm">
                  {formData.description || 'Category description'}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className={`w-full px-4 py-3 rounded-xl border transition-all text-gray-900 placeholder-gray-500 bg-white ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Category Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter category description (optional)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Icon <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-3">
                {availableIcons.map((icon) => {
                  const IconComponent = icon.icon;
                  return (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 text-gray-700 ${
                        formData.icon === icon.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="text-2xl mx-auto mb-1" />
                      <div className="text-xs font-medium text-gray-700">{icon.label}</div>
                    </button>
                  );
                })}
              </div>
              {errors.icon && (
                <p className="mt-2 text-sm text-red-600">{errors.icon}</p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.color === color.value
                        ? 'border-gray-800 ring-2 ring-gray-300'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 ${color.preview} rounded-lg mx-auto mb-1`}></div>
                    <div className="text-xs font-medium text-gray-600">{color.label}</div>
                  </button>
                ))}
              </div>
              {errors.color && (
                <p className="mt-2 text-sm text-red-600">{errors.color}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
