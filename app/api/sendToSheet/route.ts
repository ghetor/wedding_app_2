import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "submissions!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.timestamp,
            data.code,
            data.amount,
            JSON.stringify(data.companies),
            JSON.stringify(data.allocations),
            JSON.stringify(data.participants),
            data.message ?? "",
            data.user_agent ?? "",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ ERRORE GOOGLE:", err);
    return NextResponse.json(
      { success: false, error: err.toString() },
      { status: 500 }
    );
  }
}
