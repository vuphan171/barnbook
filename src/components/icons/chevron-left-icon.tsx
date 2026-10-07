import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color: string;
  size?: number;
};

export const ChevronLeftIcon: React.FC<Props> = ({ color, size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M15 5l-7 7 7 7' />
  </Svg>
);
