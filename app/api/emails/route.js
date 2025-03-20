import fs from "fs"
import path from "path"

export async function POST(request) {
    try {
        const { email } = await request.json()

        if (!email || !email.includes('@')) {
            return Response.json({ error: "Invalid email address" }, { status: 400 })
        }

        // define where email list will be stored
        const filePath = path.join(process.cwd(), "emails.json")
        let emailList = []

        if (fs.existsSync(filePath)) {
            emailList = JSON.parse(fs.readFileSync(filePath, "utf8"))
        }

        if (!emailList.includes(email)) {
            emailList.push(email)
            fs.readFileSync(filePath, JSON.stringify(emailList, null, 2))
        }

        return Response.json({ message: "Email added successfully!" })
    } catch (err) {
        return Response.json({ error: "Failed to add email" }, { status: 500 })
    }
}
