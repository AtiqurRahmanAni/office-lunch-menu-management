const log = (req, res, next) => {
  console.log(`Current url: ${req.url}`);
  next();
};

export default log;
