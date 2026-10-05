import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
  color: string;
  size?: number;
  off?: boolean;
};

export const EyeIcon = ({ color, size = 22, off = false }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
  >
    <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <Circle cx={12} cy={12} r={3} />
    {off ? <Path d="M3 3l18 18" /> : null}
  </Svg>
);
