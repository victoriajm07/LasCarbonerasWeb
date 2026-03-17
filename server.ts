import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets Auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  // API Routes
  app.post("/api/register-balcony", async (req, res) => {
    try {
      const { fullName, address, phone, email, category } = req.body;
      
      if (!spreadsheetId) {
        throw new Error("GOOGLE_SHEETS_ID is not defined");
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Balcones!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [new Date().toISOString(), fullName, address, phone, email, category],
          ],
        },
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error registering balcony:", error);
      res.status(500).json({ error: "Failed to register balcony" });
    }
  });

  app.post("/api/register-talent", async (req, res) => {
    try {
      const { fullName, actName, phone, email, needs } = req.body;

      if (!spreadsheetId) {
        throw new Error("GOOGLE_SHEETS_ID is not defined");
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Talento!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [new Date().toISOString(), fullName, actName, phone, email, needs],
          ],
        },
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error registering talent:", error);
      res.status(500).json({ error: "Failed to register talent" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
