import { string } from 'prop-types';

export default function IconBlackSpot({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
    >
      <circle className="icon-status" cx="14" cy="14" r="14"></circle>
      <circle fill="#FFFFFF" cx="14" cy="14" r="8"></circle>
      <circle fill="#000000" cx="14" cy="14" r="7"></circle>
    </svg>
  );
}

IconBlackSpot.propTypes = {
  className: string,
  fill: string,
};
