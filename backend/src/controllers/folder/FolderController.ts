import { Request, Response } from "express";
import { Connection } from "mysql2/promise";
import { Folder } from "../../models/folder.model";

export const listFolders = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  try {
    // @ts-ignore
    const [folderRows] = await dbConnection.query<Folder[]>("SELECT * FROM folder");
    res.status(200).json(folderRows);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Error fetching folders" });
  }
};

export const getFolderById = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const folderId = req.params.folder_id;

  try {
    // @ts-ignore
    const [folderRows] = await dbConnection.query<Folder[]>(
      "SELECT * FROM folder WHERE id = ?",
      [folderId]
    );

    if (folderRows.length === 0) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.status(200).json(folderRows[0]);
  } catch (error) {
    console.error("Error getting folder by ID:", error);
    res.status(500).json({ error: "Error getting folder by ID" });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const { name, description, creator } = req.body;

  try {
    const now = new Date();
    await dbConnection.query(
      "INSERT INTO folder (name, description, creator, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      [name, description, creator, now, now]
    );

    res.status(201).json({ message: "Folder created successfully" });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Error creating folder" });
  }
};

export const updateFolder = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const folderId = req.params.folder_id;
  const { name, description } = req.body;

  try {
    const now = new Date();
    await dbConnection.query(
      "UPDATE folder SET name = ?, description = ?, updated_at = ? WHERE id = ?",
      [name, description, now, folderId]
    );

    res.status(200).json({ message: "Folder updated successfully" });
  } catch (error) {
    console.error("Error updating folder:", error);
    res.status(500).json({ error: "Error updating folder" });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const folderId = req.params.folder_id;

  try {
    await dbConnection.query("DELETE FROM folder WHERE id = ?", [folderId]);

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ error: "Error deleting folder" });
  }
};
