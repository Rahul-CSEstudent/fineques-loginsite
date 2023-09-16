import { NextRequest, NextResponse } from 'next/server';

import { verbose } from 'sqlite3';
import { hash } from 'bcrypt';
const sqlite3 = verbose();

export async function POST(req: NextRequest) {
    const db = new sqlite3.Database('./users.db');
    const formData = await req.formData()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const hashedPassword = await hash(password, 10);

    const getUserPromise = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get("SELECT employee_id, full_name, email FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        resolve(NextResponse.json(row));
                    } else {
                        resolve(NextResponse.json({
                            message: "User not found"}));
                    }
                }
            });
        });
    }).finally(() => {
        db.close();
    });

    return await getUserPromise.catch(()=>{
        return NextResponse.json({
            message: "Server error"
        })
    })

}