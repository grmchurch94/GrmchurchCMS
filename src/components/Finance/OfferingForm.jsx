import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiCalendar, FiDollarSign, FiUser, FiClock } = FiIcons;

const OfferingForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    service: initialData?.service || 'Sunday Morning Service',
    cashAmount: initialData?.cashAmount || '',
    transferAmount: initialData?.transferAmount || '',
    posAmount: initialData?.posAmount || '',
    collectedBy: initialData?.collectedBy || '',
    countedBy: initialData?.countedBy || 'Finance Team',
    notes: initialData?.notes || ''
  });

  const serviceTypes = [
    'Sunday Morning Service',
    'Sunday Evening Service',
    'Midweek Service',
    'Prayer Meeting',
    'Special Service',
    'Youth Service',
    'Children\'s Service'
  ];

  const collectors = [
    'Deacon Michael',
    'Deacon Sarah',
    'Elder John',
    'Elder Mary',
    'Usher Team Leader',
    'Finance Committee'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const cashAmount = parseFloat(formData.cashAmount) || 0;
    const transferAmount = parseFloat(formData.transferAmount) || 0;
    const posAmount = parseFloat(formData.posAmount) || 0;
    const totalAmount = cashAmount + transferAmount + posAmount;
    
    if (totalAmount <= 0) {
      alert('Please enter at least one offering amount');
      return;
    }
    
    if (!formData.collectedBy.trim()) {
      alert('Please specify who collected the offering');
      return;
    }
    
    onSubmit({
      ...formData,
      cashAmount: cashAmount,
      transferAmount: transferAmount,
      posAmount: posAmount
    });
  };

  // Calculate total in real-time
  const totalAmount = (parseFloat(formData.cashAmount) || 0) + 
                     (parseFloat(formData.transferAmount) || 0) + 
                     (parseFloat(formData.posAmount) || 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Offering Record' : 'Record New Offering'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Service Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type*</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Offering Amounts */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Offering Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cash Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="cashAmount"
                      min="0"
                      step="0.01"
                      value={formData.cashAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Transfer</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="transferAmount"
                      min="0"
                      step="0.01"
                      value={formData.transferAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">POS/Card</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="posAmount"
                      min="0"
                      step="0.01"
                      value={formData.posAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              
              {/* Total Display */}
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-emerald-800">Total Offering:</span>
                  <span className="text-2xl font-bold text-emerald-900">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </Card>

            {/* Collection Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Collected By*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <select 
                      name="collectedBy"
                      value={formData.collectedBy}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select collector</option>
                      {collectors.map((collector, index) => (
                        <option key={index} value={collector}>{collector}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Counted By*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="countedBy"
                      value={formData.countedBy}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Who counted the offering"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Notes */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add any additional notes about this offering collection..."
              />
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Button 
                variant="secondary" 
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                icon={FiSave}
                type="submit"
              >
                {initialData ? 'Update Offering' : 'Save Offering'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferingForm;