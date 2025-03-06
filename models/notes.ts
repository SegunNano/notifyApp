import mongoose from "mongoose";
const { models, model, Schema } = mongoose
const required: true = true
const unique: true = true

const noteSchema = new Schema({
    title: { type: String, required },
    content: { type: String, required },
    tags: { type: [String], default: [], required },
    isPinned: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: "User", required }
}, { timestamps: true });





const Note = models?.Note || model('Note', noteSchema)


export default Note