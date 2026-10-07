import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color: string;
  size?: number;
};

export const CheckIcon: React.FC<Props> = ({ color, size = 14 }) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <Path
      d='M5 12.5l4.5 4.5L19 7'
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
