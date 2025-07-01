
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Edit2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import MobileHeader from '@/components/layout/MobileHeader';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    contact: user?.contact || '',
    address: user?.address || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateProfile(formData);
      setIsLoading(false);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader showBack={true} />
      
      <div className="px-4 py-6 pb-20">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="text-center">
            <div className="p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-raleway font-bold text-text-primary mb-1">
                {user?.name || 'User Name'}
              </h2>
              <p className="text-text-secondary font-poppins">
                {user?.email || 'user@example.com'}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 size={16} className="mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </Card>

          {/* Profile Form */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-raleway font-semibold text-text-primary mb-6">
                Personal Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-poppins ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary focus:border-transparent' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-poppins ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary focus:border-transparent' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-poppins ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary focus:border-transparent' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-text-secondary" size={20} />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-poppins resize-none ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary focus:border-transparent' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full flex items-center justify-center space-x-2"
                      isLoading={isLoading}
                    >
                      <Save size={20} />
                      <span>Update Profile</span>
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </Card>

          {/* Study Stats */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-raleway font-semibold text-text-primary mb-4">
                Study Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-raleway font-bold text-primary">12</p>
                  <p className="text-sm text-text-secondary font-poppins">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-raleway font-bold text-primary">45h</p>
                  <p className="text-sm text-text-secondary font-poppins">Study Time</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default Profile;
