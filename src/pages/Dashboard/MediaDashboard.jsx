import React from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiVideo, 
  FiMusic, 
  FiImage, 
  FiFile,
  FiUpload,
  FiDownload,
  FiPlay,
  FiEdit,
  FiCalendar,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiFolder,
  FiCamera,
  FiMic,
  FiMonitor,
  FiPlus,
  FiEye
} = FiIcons;

const MediaDashboard = () => {
  // Mock media stats
  const mediaStats = {
    totalFiles: 1247,
    videoFiles: 89,
    audioFiles: 156,
    imageFiles: 892,
    documentFiles: 110,
    storageUsed: 2.4, // GB
    storageLimit: 10.0 // GB
  };

  const recentUploads = [
    {
      id: 1,
      name: 'Sunday Service - June 4',
      type: 'video',
      size: '1.2 GB',
      uploadDate: '2023-06-04',
      uploader: 'Media Team',
      views: 245
    },
    {
      id: 2,
      name: 'Worship Practice Session',
      type: 'audio',
      size: '45 MB',
      uploadDate: '2023-06-03',
      uploader: 'Worship Team',
      views: 89
    },
    {
      id: 3,
      name: 'Youth Event Photos',
      type: 'image',
      size: '25 MB',
      uploadDate: '2023-06-02',
      uploader: 'Youth Ministry',
      views: 156
    }
  ];

  const upcomingProductions = [
    {
      id: 1,
      title: 'Father\'s Day Service Recording',
      date: '2023-06-18',
      time: '10:00 AM',
      type: 'Live Stream',
      assignedTo: 'Video Team',
      equipment: ['Camera 1', 'Camera 2', 'Audio Mixer']
    },
    {
      id: 2,
      title: 'Youth Concert Photography',
      date: '2023-06-20',
      time: '7:00 PM',
      type: 'Photography',
      assignedTo: 'Photo Team',
      equipment: ['DSLR Camera', 'Lighting Kit']
    },
    {
      id: 3,
      title: 'Podcast Recording',
      date: '2023-06-22',
      time: '2:00 PM',
      type: 'Audio Recording',
      assignedTo: 'Audio Team',
      equipment: ['Studio Microphones', 'Audio Interface']
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return FiVideo;
      case 'audio':
        return FiMusic;
      case 'image':
        return FiImage;
      case 'document':
        return FiFile;
      default:
        return FiFile;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-500';
      case 'audio':
        return 'text-purple-500';
      case 'image':
        return 'text-green-500';
      case 'document':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getProductionIcon = (type) => {
    switch (type) {
      case 'Live Stream':
        return FiVideo;
      case 'Photography':
        return FiCamera;
      case 'Audio Recording':
        return FiMic;
      default:
        return FiMonitor;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Media Department Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage multimedia content and productions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiCalendar}>Schedule Production</Button>
          <Button icon={FiUpload}>Upload Media</Button>
        </div>
      </div>

      {/* Media Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Files</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{mediaStats.totalFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiFolder} className="text-emerald-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Videos</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{mediaStats.videoFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiVideo} className="text-blue-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Audio</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{mediaStats.audioFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiMusic} className="text-purple-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Images</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{mediaStats.imageFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiImage} className="text-green-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Documents</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{mediaStats.documentFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiFile} className="text-orange-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Storage</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{mediaStats.storageUsed}GB</p>
              <p className="text-xs text-gray-500">of {mediaStats.storageLimit}GB</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100">
              <SafeIcon icon={FiUpload} className="text-indigo-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
            <SafeIcon icon={FiUpload} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentUploads.map(upload => (
              <div key={upload.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-100 rounded-md">
                  <SafeIcon 
                    icon={getTypeIcon(upload.type)} 
                    className={`${getTypeColor(upload.type)}`} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{upload.name}</h4>
                  <p className="text-sm text-gray-600">By: {upload.uploader}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>{upload.size}</span>
                    <span>{upload.views} views</span>
                    <span>{format(new Date(upload.uploadDate), 'MMM d')}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" icon={FiEye}></Button>
                  <Button variant="outline" size="sm" icon={FiDownload}></Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View Media Library</Button>
          </div>
        </Card>

        {/* Upcoming Productions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Productions</h3>
            <SafeIcon icon={FiCalendar} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingProductions.map(production => (
              <div key={production.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={getProductionIcon(production.type)} className="text-blue-500" />
                    <h4 className="font-medium text-gray-900">{production.title}</h4>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {production.type}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    <span>{format(new Date(production.date), 'MMM d, yyyy')} at {production.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUsers} className="text-gray-400" />
                    <span>Assigned to: {production.assignedTo}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Equipment needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {production.equipment.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View Production Schedule</Button>
          </div>
        </Card>
      </div>

      {/* Storage Usage */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
          <SafeIcon icon={FiFolder} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Used Storage</span>
              <span className="font-medium">{mediaStats.storageUsed}GB / {mediaStats.storageLimit}GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(mediaStats.storageUsed / mediaStats.storageLimit) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((mediaStats.storageUsed / mediaStats.storageLimit) * 100).toFixed(1)}% used
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <SafeIcon icon={FiVideo} className="text-blue-500 text-2xl mb-1 mx-auto" />
              <p className="text-sm font-medium text-gray-900">{mediaStats.videoFiles}</p>
              <p className="text-xs text-gray-500">Videos</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <SafeIcon icon={FiMusic} className="text-purple-500 text-2xl mb-1 mx-auto" />
              <p className="text-sm font-medium text-gray-900">{mediaStats.audioFiles}</p>
              <p className="text-xs text-gray-500">Audio</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <SafeIcon icon={FiImage} className="text-green-500 text-2xl mb-1 mx-auto" />
              <p className="text-sm font-medium text-gray-900">{mediaStats.imageFiles}</p>
              <p className="text-xs text-gray-500">Images</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <SafeIcon icon={FiFile} className="text-orange-500 text-2xl mb-1 mx-auto" />
              <p className="text-sm font-medium text-gray-900">{mediaStats.documentFiles}</p>
              <p className="text-xs text-gray-500">Documents</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Media Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiUpload} className="text-blue-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Upload Media</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiVideo} className="text-green-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Live Stream</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiCamera} className="text-purple-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Photo Shoot</span>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiMic} className="text-orange-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Audio Record</span>
          </button>
          <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiEdit} className="text-red-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Edit Content</span>
          </button>
          <button className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiMonitor} className="text-indigo-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Equipment</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default MediaDashboard;