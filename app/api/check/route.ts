import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const email = formData.get('email')

    const userDataPath = path.join(__dirname, 'UserData.csv');
    // const userDataPath = "./UserData.csv";

    const fileData = fs.readFileSync(userDataPath, 'utf-8');
    const records:any = [];
    const rows = fileData.split('\n');
    rows.forEach((row:any) => {
        const [empnumber, fullname, email] = row.split(',');
        if (empnumber && fullname && email) {
            records.push({ empnumber, fullname, email });
        }
    });
    

    const userRecord = records.find((record:any) => record.email === email);
    console.log(userRecord);
    if (userRecord){
        return NextResponse.json({
            message: "user found",
            user: userRecord,
        })
    }else {
        return NextResponse.json({
            message: "user not found",
            user: {},
        })
    }
}