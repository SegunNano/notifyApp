import connectDB from "@/lib/db";
import Note from "@/models/notes";

const POST = async (req: Request) => {
    try {
        const { author } = await req.json(); // ✅ Parse JSON correctly
        await connectDB();
        const notes = await Note.find({ author: author }).sort({ isPinned: -1 });
        return new Response(JSON.stringify(notes), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts!', { status: 500 });
    }
};


export { POST };
