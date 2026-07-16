import { motion } from 'framer-motion';

interface SkeletonBaseProps {
  type?: 'text' | 'title' | 'avatar' | 'thumbnail' | 'button' | 'rectangle';
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const SkeletonBase = ({
  type = 'text',
  width,
  height,
  borderRadius,
  className = '',
  style = {}
}: SkeletonBaseProps) => {
  // Determine standard styles based on type
  const getStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: 'var(--skeleton-bg)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    };

    if (width) baseStyle.width = width;
    if (height) baseStyle.height = height;
    if (borderRadius) baseStyle.borderRadius = borderRadius;

    switch (type) {
      case 'title':
        return {
          height: height || '28px',
          width: width || '60%',
          borderRadius: borderRadius || '6px',
          marginBottom: '16px',
          ...baseStyle
        };
      case 'text':
        return {
          height: height || '16px',
          width: width || '100%',
          borderRadius: borderRadius || '4px',
          marginBottom: '10px',
          ...baseStyle
        };
      case 'avatar':
        return {
          height: height || '60px',
          width: width || '60px',
          borderRadius: borderRadius || '50%',
          ...baseStyle
        };
      case 'thumbnail':
        return {
          height: height || '180px',
          width: width || '100%',
          borderRadius: borderRadius || '12px',
          ...baseStyle
        };
      case 'button':
        return {
          height: height || '44px',
          width: width || '140px',
          borderRadius: borderRadius || '4px',
          ...baseStyle
        };
      case 'rectangle':
      default:
        return {
          height: height || '100px',
          width: width || '100%',
          borderRadius: borderRadius || '8px',
          ...baseStyle
        };
    }
  };

  return (
    <motion.div
      className={`skeleton-shimmer ${className}`}
      style={getStyle()}
      animate={{
        opacity: [0.5, 0.85, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

export default SkeletonBase;
