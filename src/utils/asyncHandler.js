// asyncHandler using Promise
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(next);
        // .catch((err) => next(err));
    };
}

export { asyncHandler };





// asyncHandler using Try Catch Block
// // const asyncHandler = () => {}
// // const asyncHandler = (fn) => () => {}
// // const asyncHandler = (fn) => async() => {}
// // Wrapper Function asyncHandler
// const asyncHandler = (fn) => async (err, req, res, next) => {
//     try {
//         await fn(err, req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// export { asyncHandler }