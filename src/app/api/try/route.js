import { NextResponse } from 'next/server';
import jsonfile from 'jsonfile';
import simpleGit from 'simple-git';

const dataFilePath = './data.json';

export async function POST(req) {
  try {
    const { date, message } = await req.json();

    if (!date || !message) {
      return NextResponse.json(
        { error: 'Both date and message are required' },
        { status: 400 }
      );
    }

    const git = simpleGit();
    const data = { date };

    try {
      await jsonfile.writeFile(dataFilePath, data, { spaces: 2 });
      await git.add(dataFilePath);
      await git.commit(message, { '--date': date });
      await git.push('origin', 'main');
    } catch (err) {
      console.error(`Git error on ${date}:`, err);
      return NextResponse.json(
        { error: `Failed to commit`, details: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: `Commit created for ${date}` });
  } catch (err) {
    return NextResponse.json(
      { error: 'Unexpected error', details: err.message },
      { status: 500 }
    );
  }
}
