const ErrorFile=(status, ErrorMessage)=>{
    const error =new Error();
    error.status=status;
    error.message=ErrorMessage;
    return error;

}

export default ErrorFile;
