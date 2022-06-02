import { string } from 'prop-types';

export default function IconGebiedslocatieIVM({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: 'rotate(90deg)' }}
      fill={fill}
    >
      <circle className="icon-status" cx="14" cy="14" r="14"></circle>
      <circle fill="#FFFFFF" cx="14" cy="14" r="8"></circle>
      <g transform="translate(6,-2)">
        <path
          d="M14.9357592,15 C14.4711561,11.5845081 11.5429643,9 8,9 C4.4661588,9 1.54392811,11.597339 1.06787877,15 C1.92724609,15 14.4986572,15 14.9357592,15 Z"
          fill="#000000"
        ></path>
      </g>
      <g transform="translate(6,6)">
        <path
          d="M14.9357592,15 C14.4711561,11.5845081 11.5429643,9 8,9 C4.4661588,9 1.54392811,11.597339 1.06787877,15 C1.92724609,15 14.4986572,15 14.9357592,15 Z"
          fill="#000000"
          transform="translate(8.001819, 12.000000) rotate(-180.000000) translate(-8.001819, -12.000000) "
        ></path>
      </g>
    </svg>
  );
}

IconGebiedslocatieIVM.propTypes = {
  className: string,
  fill: string,
};
