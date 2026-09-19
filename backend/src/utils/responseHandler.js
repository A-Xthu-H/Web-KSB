export const sendResponse = (res, statusCode, message, data = null) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  res.status(statusCode).json({
    status: isSuccess ? 'success' : 'error',
    message,
    // Array kosong adalah respons data yang valid. Jangan menghapusnya dari
    // payload, karena frontend perlu membedakannya dari respons tanpa data.
    ...(data !== null && { data })
  });
};
