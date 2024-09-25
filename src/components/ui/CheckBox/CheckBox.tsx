import classNames from "classnames";
import styles from "./InputText.module.scss";
import { forwardRef } from "react";

export const CheckBox = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...inputProps }, ref) => {
  return <input type="checkbox" ref={ref} {...inputProps} />;
});
