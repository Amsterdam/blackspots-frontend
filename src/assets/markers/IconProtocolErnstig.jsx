import { string } from 'prop-types';

export default function IconProtocolErnstig({ className, fill }) {
  return (
    <svg
      width="28px"
      height="28px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
    >
      <rect className="icon-status" width="28" height="28"></rect>
      <rect fill="#FFFFFF" x="6" y="6" width="16" height="16"></rect>
      <polygon
        fill="#000000"
        transform="translate(6,6)"
        points="15 2.44006348 15 15 2.43438721 15"
      ></polygon>
      <polygon
        fill="#000000"
        transform="translate(13.5,13.5) scale(-1, -1) translate(-7.282806, -7.279968) "
        points="13.5656128 1 13.5656128 13.5599365 1 13.5599365"
      ></polygon>
    </svg>
  );
}

IconProtocolErnstig.propTypes = {
  className: string,
  fill: string,
};
