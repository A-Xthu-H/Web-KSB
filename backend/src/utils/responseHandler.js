export const sendResponse = (res, statusCode, message, data = null) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  res.status(statusCode).json({
    status: isSuccess ? 'success' : 'error',
    message,
    ...(data && { data })
  });
};