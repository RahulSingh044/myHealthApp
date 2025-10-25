'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Trash2, Eye, X } from 'lucide-react'
import { deletePrescribedMedicationAction, fetchPrescribedFile } from '../actions/recordsAction';
import toast from 'react-hot-toast';

const PrescribedRecordsTable = ({ records = [], onDelete }) => {

    const [selectedPreview, setSelectedPreview] = useState(null);
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [thumbnails, setThumbnails] = useState({});
    const thumbnailUrlsToRevoke = useRef([]);

    useEffect(() => {
        // cleanup on unmount
        return () => {
            thumbnailUrlsToRevoke.current.forEach(u => URL.revokeObjectURL(u));
            thumbnailUrlsToRevoke.current = [];
            if (selectedPreview && selectedPreview.url) {
                URL.revokeObjectURL(selectedPreview.url);
            }
        };
    }, []);

    // Preload thumbnails for image records
    useEffect(() => {
        let mounted = true;
        async function loadThumbnails() {
            // clear previous urls
            thumbnailUrlsToRevoke.current.forEach(u => URL.revokeObjectURL(u));
            thumbnailUrlsToRevoke.current = [];
            setThumbnails({});

            if (!records || !records.length) return;

            const imageRecords = records.filter(r => {
                const ft = (r.fileType || '').toLowerCase();
                return ['png', 'jpg', 'jpeg'].includes(ft);
            });

          await Promise.all(imageRecords.map(async (r) => {
                try {
          const res = await fetchPrescribedFile(r._id);
                    if (res.success) {
                        const blob = res.data;
                        const url = URL.createObjectURL(blob);
                        thumbnailUrlsToRevoke.current.push(url);
                        if (!mounted) return;
                        setThumbnails(prev => ({ ...prev, [r._id]: url }));
                    }
                } catch (err) {
                    console.error('Thumbnail load failed for', r._id, err);
                }
            }));
        }

        loadThumbnails();
        return () => {
            mounted = false;
            thumbnailUrlsToRevoke.current.forEach(u => URL.revokeObjectURL(u));
            thumbnailUrlsToRevoke.current = [];
        };
    }, [records]);

    const handleDelete = async (id) => {
        try {
            const res = await deletePrescribedMedicationAction(id);
            if (res.success) {
                toast.success('Prescription deleted');
                if (typeof onDelete === 'function') onDelete(id);
            } else {
                toast.error(res.message || 'Delete failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Delete failed');
        }
    }

    const formatBytes = (bytes) => {
        if (!bytes) return '-';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }

    const handlePreview = async (record) => {
        try {
            setLoadingPreview(true);
            const res = await fetchPrescribedFile(record._id);
            if (res.success) {
                const blob = res.data;
                const url = URL.createObjectURL(blob);
                const contentType = res.headers?.['content-type'] || (record.fileType ? (record.fileType === 'pdf' ? 'application/pdf' : (record.fileType === 'png' ? 'image/png' : (record.fileType === 'jpg' || record.fileType === 'jpeg' ? 'image/jpeg' : 'application/octet-stream'))) : 'application/octet-stream');
                setSelectedPreview({ url, type: contentType, name: record.fileName });
            } else {
                toast.error(res.message || 'Unable to fetch file');
            }
        } catch (error) {
            console.error('Preview error:', error);
            toast.error('Failed to load preview');
        } finally {
            setLoadingPreview(false);
        }
    }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">S.no</th>
            <th className="py-3 px-4 text-left">Preview</th>
            <th className="py-3 px-4 text-left">File name</th>
            <th className="py-3 px-4 text-left">Size</th>
            <th className="py-3 px-4 text-left">Uploaded</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((record, index) => (
              <tr
                key={record._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4 align-middle">{index + 1}</td>
                <td className="py-3 px-4">
                    {thumbnails[record._id] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumbnails[record._id]} alt={record.fileName} className="w-20 h-16 object-cover rounded" />
                    ) : (
                        <div className="w-20 h-16 flex items-center justify-center bg-gray-100 rounded text-sm">{record.fileType || 'file'}</div>
                    )}
                </td>
                <td className="py-3 px-4 align-middle">{record.fileName}</td>
                <td className="py-3 px-4 align-middle">{formatBytes(record.fileSize)}</td>
                <td className="py-3 px-4 align-middle">{new Date(record.createdAt).toLocaleString()}</td>
                <td className="py-3 px-4 align-middle flex gap-3">
                    <button onClick={() => handlePreview(record)} title="View">
                        <Eye className="cursor-pointer" />
                    </button>
                    <button onClick={() => handleDelete(record._id)}>
                        <Trash2 className='text-red-500 cursor-pointer' />
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-4 text-gray-500 italic"
              >
                No prescribed records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Preview modal */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-4xl w-full mx-4">
            <button
              onClick={() => { URL.revokeObjectURL(selectedPreview.url); setSelectedPreview(null); }}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              <X size={20} />
            </button>

            <div className="mt-6">
              {loadingPreview ? (
                <p className="text-center py-8">Loading preview...</p>
              ) : selectedPreview.type?.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selectedPreview.url} alt={selectedPreview.name} className="mx-auto rounded-lg max-h-[70vh]" />
              ) : selectedPreview.type === 'application/pdf' ? (
                <iframe src={selectedPreview.url} title={selectedPreview.name} className="w-full h-[75vh] border rounded" />
              ) : (
                <div className="text-center py-8">
                  <p className="mb-4">Preview not available for this file type.</p>
                  <a href={selectedPreview.url} download={selectedPreview.name} className="px-4 py-2 bg-teal-600 text-white rounded">Download {selectedPreview.name}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PrescribedRecordsTable;
