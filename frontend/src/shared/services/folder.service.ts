import { AxiosResponse } from "axios";
import { https, httpsNoToken } from "../config/https.config";
import { IFolder } from "../typeDef/folder.type";

class FolderService {
  getAllFolder(): Promise<AxiosResponse<IFolder[]>> {
    return httpsNoToken.get("/folder");
  }
  getFolderById(id: number): Promise<AxiosResponse<IFolder>> {
    return httpsNoToken.get(`/folder/${id}`);
  }
  newFolder(body: { name: string; description: string }) {
    return httpsNoToken.post("/folder", body);
  }
  updateFolder(id: number, body: { name: string; description: string }) {
    return httpsNoToken.put(`/folder/${id}`, body);
  }
  deleteFolder(id: number) {
    return https.delete(`/folder/${id}`);
  }
}

export const folderService = new FolderService();
