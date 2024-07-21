 const errorHandler=(error, req, res, next)=>{
    const errstatus=error.stausCode|| 400;
    
    res.status(errstatus);
    res.json({
        "Completed":"False", 
        "message":error.message || "Error message is not clear",
    })
}
export default errorHandler;

