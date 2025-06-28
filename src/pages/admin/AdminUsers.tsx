
import React, { useState } from 'react';
import { Search, Trash2, Eye, Mail, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

const AdminUsers: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      contact: '+1-234-567-8900',
      joinDate: '2024-01-15',
      coursesEnrolled: ['LSS Exam'],
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      contact: '+1-234-567-8901',
      joinDate: '2024-01-10',
      coursesEnrolled: ['USS Exam'],
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      contact: '+1-234-567-8902',
      joinDate: '2024-01-08',
      coursesEnrolled: ['LSS Exam', 'USS Exam'],
      status: 'Inactive'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      contact: '+1-234-567-8903',
      joinDate: '2024-01-05',
      coursesEnrolled: ['LSS Exam'],
      status: 'Active'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAdmin={true}
      />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-raleway font-bold text-text-primary mb-2">
              User Management
            </h1>
            <p className="text-text-secondary font-poppins">
              View and manage registered users
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                />
              </div>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      Courses
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-raleway font-semibold text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary font-raleway font-semibold">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-poppins font-medium text-text-primary">
                              {user.name}
                            </p>
                            <p className="text-text-secondary font-poppins text-sm flex items-center">
                              <Mail size={14} className="mr-1" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-text-secondary font-poppins text-sm flex items-center">
                          <Phone size={14} className="mr-1" />
                          {user.contact}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.coursesEnrolled.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-1 bg-primary-100 text-primary text-xs font-poppins rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-text-secondary font-poppins text-sm">
                          {user.joinDate}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-poppins rounded-full ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary font-poppins">
                  No users found matching your search criteria.
                </p>
              </div>
            )}
          </Card>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <div className="p-6 text-center">
                <p className="text-2xl font-raleway font-bold text-text-primary mb-2">
                  {users.length}
                </p>
                <p className="text-text-secondary font-poppins">Total Users</p>
              </div>
            </Card>
            <Card>
              <div className="p-6 text-center">
                <p className="text-2xl font-raleway font-bold text-green-600 mb-2">
                  {users.filter(u => u.status === 'Active').length}
                </p>
                <p className="text-text-secondary font-poppins">Active Users</p>
              </div>
            </Card>
            <Card>
              <div className="p-6 text-center">
                <p className="text-2xl font-raleway font-bold text-primary mb-2">
                  {users.reduce((acc, user) => acc + user.coursesEnrolled.length, 0)}
                </p>
                <p className="text-text-secondary font-poppins">Total Enrollments</p>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
      >
        <div className="py-4">
          <p className="text-text-secondary font-poppins mb-6">
            Are you sure you want to delete the user <strong>{selectedUser?.name}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
