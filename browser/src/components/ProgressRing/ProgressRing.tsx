import React, { FC } from 'react';

interface Props {
  progress?: number;
  size?: number;
  stroke?: number;
}

const ProgressRing: FC<Props> = ({ progress, size, stroke }) => {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg className="progress-ring" width={size} height={size}>
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={radius}
        cx={radius + stroke / 2}
        cy={radius + stroke / 2}
      />
    </svg>
  );
};

ProgressRing.defaultProps = {
  progress: 20,
  size: 16,
  stroke: 2,
};

ProgressRing.displayName = 'ProgressRing';

export default ProgressRing;
