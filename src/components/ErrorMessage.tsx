interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message){
    return null;
  }

  return (
    <div className="error-container">
      <div className="error-message">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
