import mongoose from "mongoose";
import Note from "@/models/notes";
import connectDB from "./db";

const author = '67c87fb07b0643ec9e93f15a'

const mockNotes = [
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Meeting Notes",
        content: "Discussed project updates and next steps.",
        tags: ["work", "meeting", "updates"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Grocery List",
        content: "Buy milk, eggs, bread, and coffee.",
        tags: ["shopping", "home"],
        isPinned: true,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "React Hooks Guide",
        content: "Understanding useState, useEffect, and useContext.",
        tags: ["coding", "react", "frontend"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Workout Plan",
        content: "Monday: Chest & Triceps, Tuesday: Back & Biceps...",
        tags: ["fitness", "health"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Next.js vs React",
        content: "Comparing SSR and CSR performance.",
        tags: ["coding", "nextjs", "performance"],
        isPinned: true,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Book Reading List",
        content: "1. Atomic Habits, 2. Clean Code, 3. The Pragmatic Programmer.",
        tags: ["reading", "books"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Travel Checklist",
        content: "Passport, tickets, charger, clothes, toiletries.",
        tags: ["travel", "vacation"],
        isPinned: true,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "JavaScript Best Practices",
        content: "Avoid global variables, use strict mode, modular code...",
        tags: ["coding", "javascript"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Personal Budget Plan",
        content: "Allocate 50% needs, 30% wants, 20% savings.",
        tags: ["finance", "budget"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Sunday Meal Prep",
        content: "Prepare chicken, veggies, and rice for the week.",
        tags: ["mealprep", "health"],
        isPinned: false,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

const insertManyNotes = async () => {
    try {
        await connectDB(); // Connect to the database

        // Delete existing notes (optional)
        await Note.deleteMany();

        // Insert new notes
        await Note.insertMany(mockNotes);

        console.log("Mock notes inserted successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting mock notes:", error);
        mongoose.connection.close();
    }
}

export { mockNotes, insertManyNotes }
