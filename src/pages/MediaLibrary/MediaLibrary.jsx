import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import MediaUploadForm from '../../components/MediaLibrary/MediaUploadForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiDownload,
  FiImage,
  FiVideo,
  FiMusic,
  FiFile,
  FiFolder,
  FiGrid,
  FiList,
  FiUpload
} = FiIcons;

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      name: 'Sunday Service - June 4, 2023',
      type: 'video',
      size: '1.2 GB',
      duration: '1:45:30',
      uploadDate: '2023-06-04',
      category: 'Services',
      tags: ['sunday', 'service', 'worship'],
      thumbnail: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/videos/sunday-service-june-4.mp4'
    },
    {
      id: 2,
      name: 'Worship Team Practice',
      type: 'audio',
      size: '45 MB',
      duration: '32:15',
      uploadDate: '2023-06-03',
      category: 'Music',
      tags: ['worship', 'practice', 'music'],
      thumbnail: null,
      url: 'https://example.com/audio/worship-practice.mp3'
    },
    {
      id: 3,
      name: 'Church Building Photos',
      type: 'image',
      size: '15 MB',
      duration: null,
      uploadDate: '2023-06-02',
      category: 'Photos',
      tags: ['building', 'architecture', 'church'],
      thumbnail: 'https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/images/church-building.jpg'
    },
    {
      id: 4,
      name: 'Youth Event Highlights',
      type: 'video',
      size: '800 MB',
      duration: '25:42',
      uploadDate: '2023-05-30',
      category: 'Youth',
      tags: ['youth', 'event', 'highlights'],
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/videos/youth-highlights.mp4'
    },
    {
      id: 5,
      name: 'Sermon Notes - Walking in Faith',
      type: 'document',
      size: '2 MB',
      duration: null,
      uploadDate: '2023-05-28',
      category: 'Sermons',
      tags: ['sermon', 'notes', 'faith'],
      thumbnail: null,
      url: 'https://example.com/documents/sermon-notes.pdf'
    },
    {
      id: 6,
      name: 'Christmas Concert Recording',
      type: 'audio',
      size: '120 MB',
      duration: '1:15:20',
      uploadDate: '2023-12-25',
      category: 'Events',
      tags: ['christmas', 'concert', 'music'],
      thumbnail: null,
      url: 'https://example.com/audio/christmas-concert.mp3'
    },
    {
      id: 7,
      name: 'Baptism Ceremony Photos',
      type: 'image',
      size: '25 MB',
      duration: null,
      uploadDate: '2023-05-21',
      category: 'Ceremonies',
      tags: ['baptism', 'ceremony', 'photos'],
      thumbnail: 'https://images.pexels.com/photos/8468463/pexels-photo-8468463.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/images/baptism-photos.jpg'
    },
    {
      id: 8,
      name: 'Bible Study Materials',
      type: 'document',
      size: '5 MB',
      duration: null,
      uploadDate: '2023-05-20',
      category: 'Education',
      tags: ['bible', 'study', 'materials'],
      thumbnail: null,
      url: 'https://example.com/documents/bible-study.pdf'
    }
  ]);

  const handleDeleteMedia = (mediaId) => {
    if (window.confirm('Are you sure you want to delete this media file? This action cannot be undone.')) {
      setMediaFiles(prevFiles => prevFiles.filter(file => file.id !== mediaId));
      alert('Media file has been deleted successfully!');
    }
  };

  const handleDownloadMedia = (media) => {
    const a = document.createElement('a');
    a.href = media.url;
    a.download = media.name;
    a.click();
  };

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

  const handleViewMedia = (media) => {
    setSelectedMedia(media);
    if (media.type === 'video' || media.type === 'audio') {
      window.open(media.url, '_blank');
    } else if (media.type === 'image') {
      window.open(media.url, '_blank');
    } else {
      window.open(media.url, '_blank');
    }
  };

  const handleEditMedia = (media) => {
    setSelectedMedia(media);
    setShowUploadForm(true);
  };

  const handleUploadMedia = (formData) => {
    console.log('New media data:', formData);
    
    const newMedia = {
      id: Math.max(...mediaFiles.map(m => m.id), 0) + 1,
      name: formData.name,
      type: formData.type,
      size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
      duration: formData.duration || null,
      uploadDate: new Date().toISOString().split('T')[0],
      category: formData.category,
      tags: formData.tags,
      thumbnail: formData.type === 'image' ? URL.createObjectURL(formData.file) : null,
      url: formData.url || (formData.file ? URL.createObjectURL(formData.file) : '')
    };
    
    setMediaFiles(prevFiles => [...prevFiles, newMedia]);
    alert(`Media file "${formData.name}" has been uploaded successfully!`);
    setShowUploadForm(false);
    setSelectedMedia(null);
  };

  const handleUpdateMedia = (formData) => {
    console.log('Updated media data:', formData);
    
    setMediaFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === selectedMedia.id 
          ? { ...file, ...formData, tags: formData.tags }
          : file
      )
    );
    
    alert(`Media file "${formData.name}" has been updated successfully!`);
    setShowUploadForm(false);
    setSelectedMedia(null);
  };

  const filteredMedia = mediaFiles.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          media.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || media.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalFiles = mediaFiles.length;
  const videoFiles = mediaFiles.filter(m => m.type === 'video').length;
  const audioFiles = mediaFiles.filter(m => m.type === 'audio').length;
  const imageFiles = mediaFiles.filter(m => m.type === 'image').length;
  const documentFiles = mediaFiles.filter(m => m.type === 'document').length;

  // Calculate total storage
  const totalStorage = mediaFiles.reduce((total, media) => {
    const size = parseFloat(media.size);
    const unit = media.size.split(' ')[1];
    const sizeInMB = unit === 'GB' ? size * 1024 : size;
    return total + sizeInMB;
  }, 0);

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage photos, videos, audio files, and documents</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedMedia(null);
            setShowUploadForm(true);
          }}
        >
          Upload Media
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Files</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalFiles}</p>
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
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{videoFiles}</p>
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
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{audioFiles}</p>
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
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{imageFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiImage} className="text-green-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Storage</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{(totalStorage / 1024).toFixed(1)}GB</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiUpload} className="text-orange-500 text-lg sm:text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 gap-4">
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-auto"
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg w-full sm:w-auto">
              <button
                className={`p-2 flex-1 sm:flex-none ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <SafeIcon icon={FiGrid} />
              </button>
              <button
                className={`p-2 flex-1 sm:flex-none ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <SafeIcon icon={FiList} />
              </button>
            </div>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
          </div>
        </div>
      </Card>

      {/* Media Grid/List */}
      <Card>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredMedia.map((media) => (
              <div key={media.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Media Thumbnail */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {media.thumbnail ? (
                    <img 
                      src={media.thumbnail} 
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <SafeIcon 
                      icon={getTypeIcon(media.type)} 
                      className={`text-4xl ${getTypeColor(media.type)}`} 
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                      media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                      media.type === 'image' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {media.type}
                    </span>
                  </div>
                </div>
                
                {/* Media Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-2">{media.name}</h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>Category: {media.category}</p>
                    <p>Size: {media.size}</p>
                    {media.duration && <p>Duration: {media.duration}</p>}
                    <p>Uploaded: {format(new Date(media.uploadDate), 'MMM d, yyyy')}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-center mt-4">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleViewMedia(media)}
                        title="View"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditMedia(media)}
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => handleDownloadMedia(media)}
                        title="Download"
                      >
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeleteMedia(media.id)}
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[200px]">Name</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden sm:table-cell">Size</th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden lg:table-cell">Upload Date</th>
                  <th className="text-right py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((media) => (
                  <tr key={media.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-3 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <SafeIcon 
                          icon={getTypeIcon(media.type)} 
                          className={`text-lg ${getTypeColor(media.type)}`} 
                        />
                        <div>
                          <p className="font-medium text-gray-900">{media.name}</p>
                          {media.duration && (
                            <p className="text-sm text-gray-500">Duration: {media.duration}</p>
                          )}
                          {/* Show additional info on mobile */}
                          <div className="md:hidden mt-1 space-y-1">
                            <p className="text-xs text-gray-500">Category: {media.category}</p>
                            <div className="sm:hidden">
                              <p className="text-xs text-gray-500">Size: {media.size}</p>
                            </div>
                            <div className="lg:hidden">
                              <p className="text-xs text-gray-500">Uploaded: {format(new Date(media.uploadDate), 'MMM d, yyyy')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 sm:px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                        media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                        media.type === 'image' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {media.type}
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-gray-900 hidden md:table-cell">{media.category}</td>
                    <td className="py-4 px-3 sm:px-4 text-gray-900 hidden sm:table-cell">{media.size}</td>
                    <td className="py-4 px-3 sm:px-4 text-gray-900 hidden lg:table-cell">{format(new Date(media.uploadDate), 'MMM d, yyyy')}</td>
                    <td className="py-4 px-3 sm:px-4">
                      <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                        <button 
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewMedia(media)}
                          title="View"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditMedia(media)}
                          title="Edit"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors hidden sm:block"
                         onClick={() => handleDownloadMedia(media)}
                          title="Download"
                        >
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors hidden sm:block"
                         onClick={() => handleDeleteMedia(media.id)}
                          title="Delete"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredMedia.length}</span> of <span className="font-medium">{mediaFiles.length}</span> files
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <MediaUploadForm 
          initialData={selectedMedia} 
          onClose={() => {
            setShowUploadForm(false);
            setSelectedMedia(null);
          }} 
          onSubmit={selectedMedia ? handleUpdateMedia : handleUploadMedia} 
        />
      )}
    </div>
  );
};

export default MediaLibrary;