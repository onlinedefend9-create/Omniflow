import React, { useCallback, useState } from 'react';
import { Upload, X, FileVideo, FileImage } from 'lucide-react';
import { useContentStore } from '../store/useContentStore';
import { cn } from '../lib/utils';

export const MediaUploader: React.FC = () => {
  const { mediaUrl, mediaType, setMedia } = useContentStore();
  const [isDragging, setIsDragging] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const stripMetadata = async (file: File): Promise<Blob> => {
    if (!file.type.startsWith('image/')) return file;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob || file);
          }, file.type);
        } else {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!file) return;
    
    // Simulate upload progress
    setUploadProgress(1);
    
    // Strip metadata for images
    const processedFile = await stripMetadata(file);
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    const url = URL.createObjectURL(processedFile);

    let currentProgress = 1;
    const interval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
        setMedia(url, type);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 50);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearMedia = () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setMedia(null, null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-400 mb-2">Média (Image ou Vidéo)</label>
      
      {!mediaUrl ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer min-h-[200px]",
            isDragging ? "border-blue-500 bg-blue-500/10" : "border-slate-800 hover:border-slate-700 bg-slate-900/50"
          )}
        >
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*,video/*"
            onChange={onFileChange}
          />
          <Upload className="w-10 h-10 text-slate-500 mb-3" />
          <p className="text-slate-400 text-center">
            <span className="font-semibold text-slate-200">Cliquez pour uploader</span> ou glissez-déposez
          </p>
          <p className="text-xs text-slate-500 mt-2">MP4, JPG, PNG (Max 50MB)</p>
          
          {uploadProgress > 0 && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-200" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video flex items-center justify-center">
          {mediaType === 'image' ? (
            <img src={mediaUrl} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <video src={mediaUrl} className="w-full h-full object-contain" controls />
          )}
          
          <button
            onClick={clearMedia}
            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-[10px] text-white flex items-center gap-1">
            {mediaType === 'image' ? <FileImage className="w-3 h-3" /> : <FileVideo className="w-3 h-3" />}
            {mediaType?.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};
