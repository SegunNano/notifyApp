import connectDB from "@/lib/db";
import Note from "@/models/notes";

const POST = async (req: Request, res: Response) => {
    try {
        const { author, content, tags, title } = await req.json(); // ✅ Parse JSON correctly

        await connectDB();

        const newNote = new Note({ author, content, tags, title });
        await newNote.save();

        return new Response(JSON.stringify(newNote), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create note!', { status: 500 });
    }
};

export { POST }; 