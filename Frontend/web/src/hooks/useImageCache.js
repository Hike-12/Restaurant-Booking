import { useState, useEffect } from 'react';

// In-memory cache object to store loaded images
const imageCache = {};

/**
 * Custom hook for image loading with caching
 * @param {string} src - Image source URL
 * @param {string} placeholder - Optional placeholder image URL
 * @returns {Object} - Loading state and cached image source
 */
export function useImageCache(src, placeholder = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    // Reset states when src changes
    setLoading(true);
    setError(null);

    // If src is null or undefined, don't try to load
    if (!src) {
      setLoading(false);
      return;
    }

    // If image is already cached, use it immediately
    if (imageCache[src]) {
      setImageSrc(src);
      setLoading(false);
      return;
    }

    // Create new image to preload
    const img = new Image();
    
    img.onload = () => {
      // Add to cache
      imageCache[src] = true;
      setImageSrc(src);
      setLoading(false);
    };
    
    img.onerror = (e) => {
      setError(e);
      setLoading(false);
    };
    
    // Start loading the image
    img.src = src;
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return { loading, error, imageSrc };
}

// Helper function to preload a batch of images
export function preloadImages(imageSources) {
  imageSources.forEach(src => {
    if (!imageCache[src]) {
      const img = new Image();
      img.onload = () => {
        imageCache[src] = true;
      };
      img.src = src;
    }
  });
}
