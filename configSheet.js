import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import "dotenv/config"

const { KEY_ACCESS, EMAIL_ACCESS, ID_DOC } = process.env

const serviceAccountAuth = new JWT({
    email: EMAIL_ACCESS,
    key: KEY_ACCESS.split(String.raw`\n`).join('\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
  
  const doc = new GoogleSpreadsheet(ID_DOC, serviceAccountAuth);
  
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

export default sheet;