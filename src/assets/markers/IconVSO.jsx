import { string } from 'prop-types';

export default function IconVSO({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: 'rotate(45deg)' }}
      fill={fill}
    >
      <rect className="icon-status" width="28" height="28"></rect>
      <rect fill="#FFFFFF" x="6" y="6" width="16" height="16"></rect>
      <rect fill="#000000" x="7" y="7" width="14" height="14"></rect>
    </svg>
  );
}

IconVSO.propTypes = {
  className: string,
  fill: string,
};
