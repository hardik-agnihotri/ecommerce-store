export const validate = (schema)=>(req,res,next)=>{
    try {
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query,
        })
        next()
    } catch (err) {
    return res.status(400).json({
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};