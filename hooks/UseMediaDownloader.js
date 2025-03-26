import { useState } from 'react';

export const useMediaDownloader = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const downloadMedia = async (url, filename) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch media');
      
      const contentLength = response.headers.get('content-length');
      const reader = response.body.getReader();
      let receivedLength = 0;
      let chunks = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        if (contentLength) {
          setDownloadProgress(Math.round((receivedLength / contentLength) * 100));
        }
      }
      
      const blob = new Blob(chunks);
      const blobUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || `privacygram-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return { downloadMedia, isDownloading, downloadProgress };
};
