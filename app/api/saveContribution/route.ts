import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      timestamp,
      nome,
      cognome,
      messaggio,
      amount,
      companies,
      allocations,
      user_agent,
    } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "submissions!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            timestamp,
            nome,
            cognome,
            messaggio,
            amount,
            JSON.stringify(companies),
            JSON.stringify(allocations),
            user_agent,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
