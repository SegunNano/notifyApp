import connectDB from "@/lib/db";
import Note from "@/models/notes";

const PUT = async (req: Request) => {

    try {
        const { content, tags, title, _id, isPinned } = await req.json();
        await connectDB();
        const note = await Note.findByIdAndUpdate(_id, { content, tags, title, _id, isPinned })
        return new Response(JSON.stringify(note), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to update note!', { status: 500 });
    }
};

export { PUT }; 