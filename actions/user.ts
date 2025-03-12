'use server';

import connectDB from "@/lib/db";
import bcrypt from 'bcryptjs';
import User from "@/models/user";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
    const username = formData.get('username')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!username || !email || !password) {
        return { error: "Please fill all fields" };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "User already exists!" };

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    console.log("User successfully created!");

    try {
        const res = await signIn('credentials', { redirect: false, email, password });
        if (res?.error) return { error: res.error };
    } catch (error) {
        console.error("Sign-in error:", error);
        return { error: "Something went wrong during login" };
    }

    return redirect('/');
};

export const login = async (formData: FormData) => {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!email || !password) {
        return { error: "Invalid credentials" };
    }

    try {
        const res = await signIn('credentials', { redirect: false, email, password });
        if (res?.error) return { error: res.error };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Invalid credentials" };
    }

    return redirect('/');
};

export const github = async () => {
    try {
        return await signIn('github');
    } catch (error) {
        console.error("GitHub sign-in error:", error);
        return { error: "GitHub authentication failed" };
    }
};

export const google = async () => {
    try {
        return await signIn('google');
    } catch (error) {
        console.error("Google sign-in error:", error);
        return { error: "Google authentication failed" };
    }
};

export const logout = async () => {
    try {
        await signOut();
    } catch (error) {
        console.error("Logout error:", error);
        return { error: "Logout failed" };
    }
};
