import { NextRequest, NextResponse } from 'next/server';

import { verbose } from 'sqlite3';
import { hash } from 'bcrypt';
const sqlite3 = verbose();

export async function GET(req: NextRequest) {
    const db = new sqlite3.Database('./users.db');

    const getUsersPromise = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT employee_id, full_name, email FROM users", (err: any, rows: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(NextResponse.json(rows));
                }
            });
        });
    }).finally(() => {
        db.close();
    });

    return await getUsersPromise.catch((err) => {
        return NextResponse.json({
            message: "cannot fetch users",
            err
        })
    });
}

export async function POST(req: NextRequest) {
    const db = new sqlite3.Database('./users.db');

    const formData = await req.formData()
    const email = formData.get('email') as string;
    const employee_id = parseInt(formData.get('employee_id') as string);
    const full_name = formData.get('full_name') as string;
    const password = formData.get('password') as string;

    const hashedPassword = await hash(password, 10);

    const writeUserPromise = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (employee_id TEXT, full_name TEXT, email TEXT, password TEXT)");

            const stmt = db.prepare("INSERT INTO users (employee_id, full_name, email, password) VALUES (?, ?, ?, ?)");
            stmt.run(employee_id, full_name, email, hashedPassword, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(NextResponse.json({ message: "User created successfully" }));
                }
            });
            stmt.finalize();
        });
    }).finally(() => {
        db.close();
    });

    return await writeUserPromise.catch(()=>{
        return NextResponse.json({
            message: "Cannot create user"
        })
    })
}