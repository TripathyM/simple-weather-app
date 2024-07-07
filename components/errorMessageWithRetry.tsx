import React from "react";
import Button from "./button";

interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorMessageWithRetry: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-row items-center gap-4 mb-8">
      <p className="text-center text-red-600 text-3xl font-bold">{message}</p>
      <Button title="Retry" onClick={onRetry} />
    </div>
  );
};

export default ErrorMessageWithRetry;
