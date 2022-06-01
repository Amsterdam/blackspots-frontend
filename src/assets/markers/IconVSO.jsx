import { string } from 'prop-types';

export default function IconVSO({ className }) {
  return (
    <svg
      width="40px"
      height="40px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: 'rotate(180deg)',
        marginLeft: '-11px',
        marginRight: '-4px',
      }}
    >
      <polygon className="icon-status" points="20,0 40,34 0,34"></polygon>
      <polygon fill="#FFFFFF" points="20,11 31,29 9,29"></polygon>
      <polygon fill="#000000" points="20,13 29,28 11,28"></polygon>
    </svg>
  );
}

IconVSO.propTypes = {
  className: string,
};
