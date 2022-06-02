import { string } from 'prop-types';

export default function IconSchoolstraat({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
    >
      <rect
        className="icon-status"
        transform="rotate(225)"
        x="-33.799"
        y="-14"
        width="28"
        height="28"
      />
      <rect
        transform="rotate(45)"
        x="11.799"
        y="-8"
        width="16"
        height="16"
        fill="#fff"
      />
      <rect
        transform="rotate(225)"
        x="-26.883"
        y="-7.0839"
        width="14"
        height="14"
        fill="#000"
      />
      <text
        transform="rotate(-3.4553)"
        x="9.0327959"
        y="19.092388"
        fill="#ffffff"
        xmlSpace="preserve"
      >
        <tspan x="9.0327959" y="20.602388">
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
