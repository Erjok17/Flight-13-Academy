import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage = ({
  src,
  alt = '',
  fallbackSrc = '/images/monday-training.jpg', // safe fallback default
  style,
  ...props
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
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
