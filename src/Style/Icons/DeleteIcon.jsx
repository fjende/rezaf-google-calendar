import React from 'react';

function DeleteIcon(props) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 20 20">
      <path
        fill="#7f868a"
        fillRule="evenodd"
        d="M5 15.833c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667v-10H5v10zm10.833-12.5h-2.916l-.834-.833H7.917l-.834.833H4.167V5h11.666V3.333z"
      />
    </svg>
  );
}

export default DeleteIcon;
