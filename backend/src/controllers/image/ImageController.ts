import { Request, Response } from "express";
import { Connection } from "mysql2/promise";
import { Image } from "../../models/image.model";

export const listImages = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  try {
    const [imageRows] = await dbConnection.query<any[]>(`
      SELECT image.*, folder.name AS folder_name
      FROM image
      INNER JOIN folder ON image.folder_id = folder.id
    `);
    res.status(200).json(imageRows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

export const getImageById = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const imageId = req.params.image_id;

  try {
    // @ts-ignore
    const [imageRows] = await dbConnection.query<Image[]>(
      "SELECT * FROM image WHERE id = ?",
      [imageId]
    );

    if (imageRows.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json(imageRows[0]);
  } catch (error) {
    console.error("Error getting image by ID:", error);
    res.status(500).json({ error: "Error getting image by ID" });
  }
};

export const createImage = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const { name, url, folder_id, creator } = req.body;

  try {
    const now = new Date();
    await dbConnection.query(
      "INSERT INTO image (folder_id, name, url, creator, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [folder_id, name, url, creator, now, now]
    );

    res.status(201).json({ message: "Image created successfully" });
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).json({ error: "Error creating image" });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const imageId = req.params.image_id;
  const { name, url, folder_id } = req.body;

  try {
    const now = new Date();
    await dbConnection.query(
      "UPDATE image SET folder_id = ?, name = ?, url = ?, updated_at = ? WHERE id = ?",
      [folder_id, name, url, now, imageId]
    );

    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ error: "Error updating image" });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  const dbConnection: Connection = req.app.get("dbConnection");
  const imageId = req.params.image_id;

  try {
    await dbConnection.query("DELETE FROM image WHERE id = ?", [imageId]);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
};
