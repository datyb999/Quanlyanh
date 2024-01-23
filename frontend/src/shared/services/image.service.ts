import { AxiosResponse } from "axios";
import { https, httpsNoToken } from "../config/https.config";
import { IImage } from "../typeDef/image.type";

class ImageService {
  getAllImage(): Promise<AxiosResponse<IImage[]>> {
    return httpsNoToken.get("/image");
  }
  getImageById(id: number): Promise<AxiosResponse<IImage>> {
    return httpsNoToken.get(`/image/${id}`);
  }
  newImage(body: { name: string; description: string }) {
    return httpsNoToken.post("/image", body);
  }
  updateImage(id: number, body: { name: string; description: string }) {
    return httpsNoToken.put(`/image/${id}`, body);
  }
  deleteImage(id: number) {
    return https.delete(`/image/${id}`);
  }
}

export const imageService = new ImageService();
