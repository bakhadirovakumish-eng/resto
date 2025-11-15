const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error('QR Code generation error:', error);
    return null;
  }
};

const generateTableQRCodes = async (locationId, tableNumbers) => {
  const qrcodes = {};
  for (let tableNum of tableNumbers) {
    const qrText = `${process.env.FRONTEND_URL}/menu/${locationId}?table=${tableNum}`;
    qrcodes[tableNum] = await generateQRCode(qrText);
  }
  return qrcodes;
};

module.exports = { generateQRCode, generateTableQRCodes };
