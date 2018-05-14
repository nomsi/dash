import axios from 'axios';
export class ImageUtils {
    public getImageBuffer(url: string): any {
        axios.get(url, { responseType: 'arrayBuffer '}).then((r: any) => Buffer.from(r.data, 'binary'));
    }
}
