import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Link = (props) => {
  const { label, to, className } = props;
  return (
    <>
      <RouterLink to={to} className={className}>
        {label}
      </RouterLink>
    </>
  );
};
