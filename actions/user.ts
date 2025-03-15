'use server';

import connectDB from "@/lib/db";
import bcrypt from 'bcryptjs';
import User from "@/models/user";
import { signIn, signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

export const register = async (formData: FormData): Promise<void> => {
    const username = formData.get('username')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!username || !email || !password) {
        throw new Error("Please fill all fields");
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    console.log("User successfully created!");

    try {
        const res = await signIn('credentials', { redirect: false, email, password });
        if (res?.error) throw new Error(res.error);
    } catch (error) {
        console.error("Sign-in error:", error);
        throw new Error("Something went wrong during login");
    }

    redirect('/');
};

export const login = async (formData: FormData): Promise<void> => {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!email || !password) {
        throw new Error("Invalid credentials");
    }

    try {
        const res = await signIn('credentials', { redirect: false, email, password });
        if (res?.error) throw new Error(res.error);
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Invalid credentials");
    }

    redirect('/');
};

export const github = async (): Promise<void> => {
    try {
        await signIn('github');
    } catch (error) {
        console.error("GitHub sign-in error:", error);
        throw new Error("GitHub authentication failed");
    }
};

export const google = async (): Promise<void> => {
    try {
        await signIn('google');
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw new Error("Google authentication failed");
    }
};


export const logout = async (): Promise<void> => {
    try {
        const session = await auth(); // Ensure session is initialized
        if (!session) throw new Error("No active session found.");
        await signOut({ redirectTo: "/" });
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Logout failed");
    }
};