import { motion } from 'framer-motion';

interface MediaSkeletonProps {
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const ImageSkeleton = ({
  aspectRatio = '16/9',
  width = '100%',
  height,
  borderRadius = '12px'
}: MediaSkeletonProps) => {
  return (
    <motion.div
      style={{
        width,
        height: height || '100%',
        aspectRatio: height ? undefined : aspectRatio,
        borderRadius,
        backgroundColor: 'var(--skeleton-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
      animate={{ opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Centered Image Icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#cccccc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </motion.div>
  );
};

export const VideoSkeleton = ({
  aspectRatio = '16/9',
  width = '100%',
  height,
  borderRadius = '12px'
}: MediaSkeletonProps) => {
  return (
    <motion.div
      style={{
        width,
        height: height || '100%',
        aspectRatio: height ? undefined : aspectRatio,
        borderRadius,
        backgroundColor: 'var(--skeleton-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
      animate={{ opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Centered Video Play Circle Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '3px solid #cccccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#cccccc"
          style={{ marginLeft: '4px' }}
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
    </motion.div>
  );
};
