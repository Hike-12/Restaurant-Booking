import React from 'react';
import { motion } from 'framer-motion';
import { useImageCache } from '../hooks/useImageCache';

/**
 * Optimized image component with loading state
 */
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
  // Process the src if it's a relative path from the API
  const fullSrc = src && src.startsWith('http') ? src : `${VITE_API_BASE_URL.replace('/api', '')}${src}`;
  
  // Use the image cache hook
  const { loading, error, imageSrc } = useImageCache(fullSrc);

  // Call onLoad callback when image is loaded
  React.useEffect(() => {
    if (!loading && !error) {
      onLoad();
    }
  }, [loading, error, onLoad]);

  // Default loading placeholder
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
      {/* Show loading component while image is loading */}
      {loading && (loadingComponent || defaultLoadingComponent)}
      
      {/* Show the actual image */}
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
      
      {/* Show error state */}
      {error && (
        <div className="flex items-center justify-center w-full h-full bg-red-100 text-red-500 text-sm p-2 rounded">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
