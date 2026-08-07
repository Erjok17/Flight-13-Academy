import { useState } from 'react';
import { ImageSkeleton } from './MediaSkeleton';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage = ({
  src,
  alt = '',
  style,
  ...props
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError || !src) {
    const borderRadius = style?.borderRadius || '0px';
    const width = style?.width || '100%';
    const height = style?.height || '100%';

    return (
      <div style={{ width, height, borderRadius: borderRadius as any, overflow: 'hidden' }}>
        <ImageSkeleton width="100%" height="100%" borderRadius={borderRadius} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      style={{
        objectFit: 'cover',
        display: 'block',
        ...style
      }}
      {...props}
    />
  );
};

export default SafeImage;
