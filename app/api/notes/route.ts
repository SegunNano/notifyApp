import connectDB from "@/lib/db";
import Note from "@/models/notes";


// const POST = async (req, res) => {
//     const { author, note, tag } = await req.json();
//     try {
//         console.log('object');
//         await connectDB();
//         const newNote = new Note({ author, tag, note });
//         await newNote.save();

//         return new Response(JSON.stringify(newNote), { status: 201 });
//     } catch (error) {
//         console.log(error);
//         return new Response('Failed to create note!', { status: 500 });
//     }
// };

// export { POST };