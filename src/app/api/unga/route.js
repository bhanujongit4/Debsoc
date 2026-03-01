import { NextResponse } from 'next/server';

const SHEET_ID = '1fAqZqfhPTEWgts5dFLirfDKylp4EkJHaPPe-dm2frpY';
const GID = '505984852'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

export async function GET() {
  try {
    const response = await fetch(SHEET_URL, { cache: 'no-store' });
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    const portfolios = [];

    const parseLine = (line) => {
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (parts.length < 3) return null;
      
      return {
        portfolio: parts[1]?.replace(/^"|"$/g, '').trim(), // Column B
        status: parts[2]?.replace(/^"|"$/g, '').trim()      // Column C
      };
    };

    // Data: Rows 4 to 126 (Array Indices 3 to 125)
    for (let i = 3; i <= 125; i++) {
      if (lines[i]) {
        const data = parseLine(lines[i]);
        if (data && data.portfolio) {
          portfolios.push(data);
        }
      }
    }

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('UNGA API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch UNGA data' }, { status: 500 });
  }
}