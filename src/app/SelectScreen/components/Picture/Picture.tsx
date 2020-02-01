import * as React from 'react';

export const Picture: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...restProps }) => (
  <picture>
    <source srcSet={`${src}.webp`} type="image/webp" />
    <source srcSet={`${src}.png`} type="image/png" />
    <img src={`${src}.png`} {...restProps} />
  </picture>
);
