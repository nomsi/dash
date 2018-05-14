"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ImageUtils {
    getImageBuffer(url) {
        axios_1.default.get(url, { responseType: 'arrayBuffer ' }).then((r) => Buffer.from(r.data, 'binary'));
    }
}
exports.ImageUtils = ImageUtils;
