import axios, { AxiosResponse } from 'axios';
export class ImageUtils {
    public async getImageBuffer(url: string): Promise<String> {
        const imageBuffer = await axios.get(url, { responseType: 'arrayBuffer' })
        .then((r: AxiosResponse) => Buffer.from(r.data, 'binary').toString('base64'));
        return imageBuffer;
    }
}
