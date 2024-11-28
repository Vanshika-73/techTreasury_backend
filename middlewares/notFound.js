const notFound = (req, res, next) => {
    console.error(`Route not found: ${req.method} ${req.path}`);
    res.status(404).json({ error: `Route not found: ${req.path}` });
  };
  
  export default notFound;
  