import { NextResponse } from 'next/server';

const SHEET_ID = '1fAqZqfhPTEWgts5dFLirfDKylp4EkJHaPPe-dm2frpY';
const GID = '691615942'; 
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

    // Data: Rows 5 to 68 (Array Indices 4 to 67)
    for (let i = 3; i <= 67; i++) {
      if (lines[i]) {
        const data = parseLine(lines[i]);
        if (data && data.portfolio) {
          portfolios.push(data);
        }
      }
    }

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('UNCSW API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch UNCSW data' }, { status: 500 });
  }
}