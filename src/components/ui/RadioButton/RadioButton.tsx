import classNames from "classnames";
import styles from "./InputText.module.scss";
import { forwardRef } from "react";

export const RadioButton = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...inputProps }, ref) => {
  return <input type="radio" ref={ref} {...inputProps} />;
});
