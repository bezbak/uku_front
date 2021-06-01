import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

const Button = ({
                  children,
                  className,
                  textClassName,
                  iconBeforeClassName,
                  iconAfterClassName,
                  onClick,
                  disabled,
                  active,
                  type,
                  style,
                  icon: IconAfter,
                  iconBefore: IconBefore,
                  ...props
                }) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(styles.button, className, {
        [styles.button_disabled]: !!disabled,
        [styles[`button_style_${style}`]]: !!style,
        [styles[`button_style_${style}_active`]]: !!active,
      })}
    >
      {!!IconBefore && (
        <span
          className={classNames(styles.button__iconBefore, iconBeforeClassName)}
        >
          <IconBefore />
        </span>
      )}
      <span className={classNames(styles.button__text, textClassName)}>{children}</span>
      {!!IconAfter && (
        <span
          className={classNames(styles.button__iconAfter, iconAfterClassName)}
        >
          <IconAfter />
        </span>
      )}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
  active: false,
};

export default Button;
