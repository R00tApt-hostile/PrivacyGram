import React from 'react';
import { useMediaDownloader } from '../../hooks/useMediaDownloader';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CircularProgress from '@material-ui/core/CircularProgress';

const DownloadButton = ({ mediaUrl, mediaType, filename }) => {
  const { downloadMedia, isDownloading, downloadProgress } = useMediaDownloader();

  const handleDownload = () => {
    let finalFilename = filename;
    if (!finalFilename) {
      const ext = mediaType === 'image' ? 'jpg' : 'mp4';
      finalFilename = `privacygram-${Date.now()}.${ext}`;
    }
    
    downloadMedia(mediaUrl, finalFilename)
      .catch(error => {
        // Error handling would be implemented here
        console.error('Download error:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={
        isDownloading ? (
          <CircularProgress size={20} value={downloadProgress} />
        ) : (
          <CloudDownloadIcon />
        )
      }
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? `${downloadProgress}%` : 'Download'}
    </Button>
  );
};

export default DownloadButton;
