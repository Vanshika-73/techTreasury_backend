const notFound = (req, res, next) => {
    const error = new Error(`Not found: ${req.path}`);
    res.status(404);
    next(error);
  };
  
  export default notFound;