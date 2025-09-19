// TitleAndDescription.tsx
import React from "react";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
}

const TitleAndDescription: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600 font-medium mt-1">{description}</p>
    </div>
  );
};

export default TitleAndDescription;
