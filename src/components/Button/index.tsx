import { FC, PropsWithChildren, ButtonHTMLAttributes, memo } from "react";

import "./style.sass";

interface Props
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
}

const Button: FC<Props> = ({ loading, children, disabled, ...props }) => {
  return (
    <button
      type="button"
      className="button"
      disabled={loading || disabled}
      {...props}
    >
      {children}
      {loading && (
        <div className="spinner-wrapper">
          <i className="fa fa-circle-o-notch fa-spin" />
        </div>
      )}
    </button>
  );
};

export default memo(Button);
