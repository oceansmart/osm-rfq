"use client";

import type { SVGProps } from "react";

interface ExcelIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const ExcelIcon = ({ size = 20, ...props }: ExcelIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        {/* Main Excel background */}
        <rect
          x="5"
          y="1.25"
          width="15"
          height="17.5"
          rx="2"
          fill="#2FB776"
        />

        {/* Bottom right section */}
        <rect
          x="12.5"
          y="10"
          width="7.5"
          height="4.375"
          fill="#229C5B"
        />

        {/* Middle right section */}
        <rect
          x="12.5"
          y="5.625"
          width="7.5"
          height="4.375"
          fill="#27AE68"
        />

        {/* Middle left section */}
        <rect
          x="5"
          y="5.625"
          width="7.5"
          height="4.375"
          fill="#197B43"
        />

        {/* Bottom left section */}
        <rect
          x="5"
          y="10"
          width="7.5"
          height="4.375"
          fill="#1B5B38"
        />

        {/* Center gradient overlay */}
        <rect
          x="4"
          y="4.375"
          width="11.25"
          height="11.25"
          rx="2"
          fill="url(#excel-gradient)"
        />
      </g>

      <defs>
        <linearGradient
          id="excel-gradient"
          x1="4"
          y1="9.9375"
          x2="15.25"
          y2="9.9375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#185A30" />
          <stop offset="1" stopColor="#176F3D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ExcelIcon;
