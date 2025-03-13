import connectDB from "@/lib/db";
import Note from "@/models/notes";

const DELETE = async (req: Request, res: Response) => {
    try {
        const { _id } = await req.json();
        await connectDB();

        const note = await Note.findByIdAndDelete(_id)

        return new Response(JSON.stringify(note), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create note!', { status: 500 });
    }
};

export { DELETE }; 