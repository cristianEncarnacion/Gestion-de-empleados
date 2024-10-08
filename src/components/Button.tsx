import React from "react";

type Props = {
  title: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
};

const Button = ({ title, handleClick, className }: Props) => {
  return (
    <div>
      <button onClick={handleClick} className={className}>
        {title}
      </button>
    </div>
  );
};

export default Button;
