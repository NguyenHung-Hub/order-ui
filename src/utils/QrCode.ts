import QRCode from 'qrcode';

const generateQR = async (text: string): Promise<string | undefined> => {
    try {
        const result = await QRCode.toDataURL(text);

        return result;
    } catch (err) {
        console.error(err);
    }
};

export { generateQR };
