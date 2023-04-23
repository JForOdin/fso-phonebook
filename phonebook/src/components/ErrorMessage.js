const ErrorMessage = ({ message }) => {
  //  console.log("Called error message component with "+message);
   
    if (message === null) {
      return null;
    }
   // setErrorMessage(message);
    return (
      <div className='error-message'>
        {message}
      </div>
    )
  }

  export default ErrorMessage;