import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const dashboard1 = `<iframe title="ALL CHANNEL DASHBOARD" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=e37360c8-956a-4fc4-a932-1384cc2c64ab&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915" frameborder="0" allowFullScreen="true"></iframe>`
const dashboard2 = `<iframe title="ADVICER - DAILY REPORT" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=611f0baf-1a6b-4d81-9500-abc3afd293cc&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915" frameborder="0" allowFullScreen="true"></iframe>`
const dashboard3 = ` <iframe title="Master daily report" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=ae359a0e-529d-42c3-b5f3-de474f0efef0&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915" frameborder="0" allowFullScreen="true"></iframe>`

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
            dashboard: [
                dashboard1,
                dashboard2,
                dashboard3   
            ]
        })
    }else {
        return NextResponse.json({
            message: "user not found",
            user: {},
            dashboard: []
        })
    }
}