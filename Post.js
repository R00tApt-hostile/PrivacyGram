import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Favorite, Comment, Share, Bookmark } from '@material-ui/icons';
import DownloadButton from '../Common/DownloadButton';
import { useTheme } from '../../contexts/ThemeContext';

const Post = ({ post }) => {
  const { themeConfig } = useTheme();
  
  // Determine media type and URL
  const isVideo = post.media_type === 'VIDEO';
  const mediaUrl = isVideo ? post.media_url : `${post.media_url}?dl=1`; // Force download for images
  
  return (
    <Card style={{ 
      marginBottom: '1rem',
      backgroundColor: themeConfig['card-background'],
      border: `1px solid ${themeConfig['border-color']}`
    }}>
      {/* Post header with user info */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0.5rem 1rem',
        borderBottom: `1px solid ${themeConfig['border-color']}`
      }}>
        <img 
          src={post.user.profile_picture} 
          alt={post.user.username}
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            marginRight: '0.75rem'
          }}
        />
        <Typography variant="subtitle1" style={{ color: themeConfig['text-primary'] }}>
          {post.user.username}
        </Typography>
      </div>
      
      {/* Post media */}
      {isVideo ? (
        <video 
          controls 
          style={{ 
            width: '100%', 
            maxHeight: '600px', 
            backgroundColor: '#000' 
          }}
        >
          <source src={post.media_url} type="video/mp4" />
        </video>
      ) : (
        <CardMedia
          component="img"
          image={post.media_url}
          alt={post.caption?.text || 'Instagram post'}
          style={{ maxHeight: '600px', objectFit: 'contain' }}
        />
      )}
      
      {/* Post actions */}
      <CardActions style={{ 
        padding: '0.5rem 1rem',
        borderTop: `1px solid ${themeConfig['border-color']}`,
        borderBottom: `1px solid ${themeConfig['border-color']}`
      }}>
        <IconButton aria-label="like">
          <Favorite style={{ color: themeConfig['text-primary'] }} />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment style={{ color: themeConfig['text-primary'] }} />
        </IconButton>
        <DownloadButton 
          mediaUrl={mediaUrl} 
          mediaType={isVideo ? 'video' : 'image'}
          filename={`${post.user.username}-${post.id}.${isVideo ? 'mp4' : 'jpg'}`}
        />
        <div style={{ flexGrow: 1 }} />
        <IconButton aria-label="save">
          <Bookmark style={{ color: themeConfig['text-primary'] }} />
        </IconButton>
      </CardActions>
      
      {/* Post caption and details */}
      <CardContent style={{ padding: '0.5rem 1rem 1rem' }}>
        {post.caption && (
          <Typography variant="body2" style={{ 
            color: themeConfig['text-primary'],
            marginBottom: '0.5rem'
          }}>
            <strong>{post.user.username}</strong> {post.caption.text}
          </Typography>
        )}
        <Typography variant="caption" style={{ color: themeConfig['text-secondary'] }}>
          {new Date(post.timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
