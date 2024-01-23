import express from "express";
import {
  createFolder,
  deleteFolder,
  updateFolder,
  getFolderById,
  listFolders,
} from "../controllers/folder/FolderController";
import {
  createImage,
  updateImage,
  deleteImage,
  getImageById,
  listImages,
} from "../controllers/image/ImageController";
import {
  authenticated,
  changePassword,
  deleteAccount,
  getAccountById,
  listAccount,
  newAccount,
  updateAccount,
} from "../controllers/account/AccountController";

const router = express.Router();
//Auth
router.post("/login", authenticated);
//User-account
router.put("/forget-password", changePassword);
router.get("/account", listAccount);
router.get("/account/:user_id", getAccountById);
router.post("/account", newAccount);
router.put("/account/:user_id", updateAccount);
router.delete("/account/:user_id", deleteAccount);
//Folder
router.get("/folder", listFolders);
router.get("/folder/:folder_id", getFolderById);
router.post("/folder", createFolder);
router.put("/folder/:folder_id", updateFolder);
router.delete("/folder/:folder_id", deleteFolder);
//Image
router.get("/image", listImages);
router.get("/image/:image_id", getImageById);
router.post("/image", createImage);
router.put("/image/:image_id", updateImage);
router.delete("/image/:image_id", deleteImage);
export default router;
