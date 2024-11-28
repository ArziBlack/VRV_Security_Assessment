import React from "react";

interface LabelProps {
  label: string;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
  );
};

export default Label;
