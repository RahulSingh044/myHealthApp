'use client';
import React, { useState, useEffect } from 'react';
import { X, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteMedicalRecords, fetchMedicalFile } from '../actions/recordsAction';

export default function MedicalRecordsTable({ data,  refreshRecords}) {
 
     const [selectedPreview, setSelectedPreview] = useState(null);
     const [deleting, setDeleting] = useState(false);
     const [loadingPreview, setLoadingPreview] = useState(false);
     const [thumbnails, setThumbnails] = useState({});
     const thumbnailUrlsToRevoke = React.useRef([]);
 
     const handleDelete = async (id) => {
         try {
             setDeleting(true);
             const res = await deleteMedicalRecords(id);
             if (res.success) {
                 toast.success("Deleted Successfully");
                 refreshRecords();
             }
         } catch (error) {
             toast.error("Unable to delete")
             console.log(error);
         } finally {
             setDeleting(false);
         }
     }

     const handlePreview = async (record) => {
         try {
             setLoadingPreview(true);
             const res = await fetchMedicalFile(record._id);
             if (res.success) {
                 const blob = res.data;
                 const url = URL.createObjectURL(blob);
                 // Prefer content-type from headers, fallback to stored fileType
                 const contentType = res.headers?.['content-type'] || (record.fileType ? (record.fileType === 'pdf' ? 'application/pdf' : (record.fileType === 'png' ? 'image/png' : (record.fileType === 'jpg' || record.fileType === 'jpeg' ? 'image/jpeg' : 'application/octet-stream'))) : 'application/octet-stream');

                 setSelectedPreview({ url, type: contentType, name: record.fileName || record.title || 'file' });
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
 
     // Revoke object URL when modal closes or component unmounts
     useEffect(() => {
         return () => {
             if (selectedPreview && selectedPreview.url) {
                 URL.revokeObjectURL(selectedPreview.url);
             }
         };
     }, [selectedPreview]);
 
    // Preload thumbnails for image records
    useEffect(() => {
        let mounted = true;
        async function loadThumbnails() {
            // clear previous urls
            thumbnailUrlsToRevoke.current.forEach(u => URL.revokeObjectURL(u));
            thumbnailUrlsToRevoke.current = [];
            setThumbnails({});
 
            if (!data || !data.length) return;
 
            const imageRecords = data.filter(r => {
                const ft = (r.fileType || '').toLowerCase();
                return ['png', 'jpg', 'jpeg'].includes(ft);
            });
 
            await Promise.all(imageRecords.map(async (r) => {
                try {
                    const res = await fetchMedicalFile(r._id);
                    if (res.success) {
                        const blob = res.data;
                        const url = URL.createObjectURL(blob);
                        thumbnailUrlsToRevoke.current.push(url);
                        if (!mounted) return;
                        setThumbnails(prev => ({ ...prev, [r._id]: url }));
                    }
                } catch (err) {
                    // ignore thumbnail load errors
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
    }, [data]);
 
     return (
         <div className="p-6">
             <div className="overflow-x-auto rounded-lg shadow">
                 <table className="min-w-full bg-white border border-gray-200">
                     <thead className="bg-teal-600 text-white">
                         <tr>
                             <th className="py-3 px-4 text-left">Title</th>
                             <th className="py-3 px-4 text-left">Record Type</th>
                             <th className="py-3 px-4 text-left">Date</th>
                             <th className="py-3 px-4 text-left">Description</th>
                             <th className="py-3 px-4 text-left">Image</th>
                             <th className="py-3 px-4 text-left">Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {data.map((record, index) => (
                             <tr key={index} className="border-b hover:bg-gray-50">
                                 <td className="py-3 px-4">{record.title}</td>
                                 <td className="py-3 px-4 capitalize">{record.recordType.replace('_', ' ')}</td>
                                 <td className="py-3 px-4">{record.date}</td>
                                 <td className="py-3 px-4">{record.description}</td>
                                 <td className="py-3 px-4">
                                     <div className="w-32 h-20 overflow-hidden rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                                        {thumbnails[record._id] ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={thumbnails[record._id]} alt={record.title} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="text-xs text-gray-400 px-2 text-center">No preview</div>
                                        )}
                                     </div>
                                 </td>
                                 <td className="py-3 px-4">
                                     <div className='flex justify-center gap-4'>
                                         <button
                                             onClick={() => handlePreview(record)}
                                             className="mt-2 text-sm cursor-pointer text-teal-600  hover:underline"
                                         >
                                             <Eye />
                                         </button>
                                         <button
                                             onClick={() => handleDelete(record._id)}
                                             className="mt-2 text-sm cursor-pointer hover:underline text-red-600"
                                         >
                                             <Trash2 />
                                         </button>
                                     </div>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
 
             {/* Modal */}
             {/* Preview modal (images and pdf inline, others downloadable) */}
             {selectedPreview && (
                 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                     <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-4xl w-full mx-4">
                         <button
                             onClick={() => setSelectedPreview(null)}
                             className="absolute top-2 right-2 text-gray-700 hover:text-black"
                         >
                             <X size={20} />
                         </button>
 
                         <div className="mt-6">
                             {loadingPreview ? (
                                 <p className="text-center py-8">Loading preview...</p>
                             ) : selectedPreview.type?.startsWith('image/') ? (
                                 // Image preview
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
}
