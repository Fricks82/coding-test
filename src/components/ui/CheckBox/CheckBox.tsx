import React from "react";
import { forwardRef } from "react";

export const CheckBox = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...inputProps }, ref) => {
  return <input type="checkbox" ref={ref} {...inputProps} />;
});
CheckBox.displayName = "CheckBox";
