'use server'

import connectDB from "@/lib/db"
import bcrypt from 'bcryptjs'
import User from "@/models/user"
import { signIn, signOut } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"

export const register = async (formData: FormData) => {
    const { hash } = bcrypt
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!(username && email && password)) {
        return { error: "Please fill all fields" }
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return { error: "User already exists!" }
    }

    const hashedPassword = await hash(password, 10)
    await User.create({ username, email, password: hashedPassword })

    console.log("User successfully created!")

    try {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (res?.error) return { error: res.error }
    } catch (error) {
        console.error("Sign-in error:", error)
        return { error: "Something went wrong during login" }
    }

    return redirect('/')
}

export const login = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (res?.error) return { error: res.error }
    } catch (error) {
        console.error("Login error:", error)
        return { error: "Invalid credentials" }
    }

    return redirect('/')
}

export const github = async () => {
    return signIn('github')
}

export const google = async () => {
    return signIn('google')
}

export const logout = async () => {
    return signOut()
}
