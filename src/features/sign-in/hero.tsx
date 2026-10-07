import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { COLORS } from '@/themes';

export const Hero = () => (
  <Svg width='100%' height={180} viewBox='0 0 375 180' preserveAspectRatio='none'>
    <Rect width={375} height={180} fill={COLORS.muted} />
    <Circle cx={288} cy={60} r={29} fill={COLORS.warning} />
    <Path d='M0 120C80 80 150 92 230 118S340 120 375 104L375 180L0 180Z' fill={COLORS.accent} />
    <Path d='M0 148C70 128 160 118 260 138S350 150 375 142L375 180L0 180Z' fill={COLORS.primary} />
    <Path d='M0 166C100 158 260 156 375 162L375 180L0 180Z' fill={COLORS.soil} />
    <Path
      d='M38 154C120 145 230 146 290 156M66 163C160 158 250 158 318 165'
      stroke={COLORS.brand}
      strokeWidth={2.5}
      strokeLinecap='round'
      fill='none'
    />
  </Svg>
);
