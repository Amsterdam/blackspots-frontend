import { string } from 'prop-types';

export default function IconSchoolstraat({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(45deg)' }}
      className={className}
      fill={fill}
    >
      <rect
        className="icon-status"
        transform="scale(-1)"
        x="-28"
        y="-28"
        width="28"
        height="28"
      />
      <rect x="6" y="6" width="16" height="16" fill="#fff" />
      <rect x="7" y="7" width="14" height="14" fill="#000" />
      <text
        transform="rotate(-45)"
        x="-5.2436399"
        y="24.098587"
        fill="#ffffff"
        xmlSpace="preserve"
      >
        <tspan x="-3.9936399" y="24.098587">
          S
        </tspan>
      </text>
    </svg>
  );
}

IconSchoolstraat.propTypes = {
  className: string,
  fill: string,
};
