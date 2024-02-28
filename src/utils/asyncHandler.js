const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default asyncHandler;

// ------------mthod 2 using trycathch block----------------
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     console.log(" ERROR: ", error);
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// export default asyncHandler;
