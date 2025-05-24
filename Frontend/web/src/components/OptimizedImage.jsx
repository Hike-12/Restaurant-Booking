import React from 'react';
import { motion } from 'framer-motion';
import { useImageCache } from '../hooks/useImageCache';
import { VITE_API_BASE_URL } from '../config/api';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width = '100%',
  height = 'auto',
  placeholderColor = '#f3f3f3',
  containerClassName = '',
  transitionDuration = 0.3,
  loadingComponent = null,
  onLoad = () => {},
}) => {
  // Process the src - if it's already a full URL, use it as is
  const fullSrc = React.useMemo(() => {
    if (!src) return '';
    
    // If it's already a full URL (starts with http), use it directly
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    
    // If it's a relative path from the API, prepend the API base URL
    return `${VITE_API_BASE_URL.replace('/api', '')}${src}`;
  }, [src]);
  
  const { loading, error, imageSrc } = useImageCache(fullSrc);

  React.useEffect(() => {
    if (!loading && !error) {
      onLoad();
    }
  }, [loading, error, onLoad]);

  const defaultLoadingComponent = (
    <div 
      style={{ 
        backgroundColor: placeholderColor,
        width: width,
        height: height,
      }}
      className="animate-pulse rounded-lg"
    />
  );

  return (
    <div className={`relative overflow-hidden ${containerClassName}`} style={{ width, height }}>
      {loading && (loadingComponent || defaultLoadingComponent)}
      
      {!loading && !error && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: transitionDuration }}
          onError={() => console.error(`Failed to load image: ${src}`)}
        />
      )}
      
      {error && (
        <div className="flex items-center justify-center w-full h-full bg-red-100 text-red-500 text-sm p-2 rounded">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;