import { useEffect } from "react";

interface ResourceHintsProps {
  preloadImages?: string[];
  prefetchImages?: string[];
  preconnectDomains?: string[];
}

/**
 * Component to add resource hints for better loading performance
 */
const ResourceHints: React.FC<ResourceHintsProps> = ({
  preloadImages = [],
  prefetchImages = [],
  preconnectDomains = []
}) => {
  useEffect(() => {
    const head = document.head;
    const addedElements: HTMLLinkElement[] = [];

    // Add preconnect hints for external domains
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = '';
      head.appendChild(link);
      addedElements.push(link);
    });

    // Add preload hints for critical images
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      link.type = getImageMimeType(src);
      head.appendChild(link);
      addedElements.push(link);
    });

    // Add prefetch hints for non-critical images
    prefetchImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      link.as = 'image';
      head.appendChild(link);
      addedElements.push(link);
    });

    // Cleanup function
    return () => {
      addedElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [preloadImages, prefetchImages, preconnectDomains]);

  return null; // This component doesn't render anything
};

/**
 * Get MIME type based on file extension
 */
const getImageMimeType = (src: string): string => {
  const extension = src.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/*';
  }
};

export default ResourceHints;
