'use server'

import connectDB from "@/lib/db"
import bcrypt from 'bcryptjs'
import User from "@/models/user"
import { signIn, signOut } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"



const login = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    try {
        await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password
        })
    } catch (error) {
        const err = error as CredentialsSignin
        console.log(err.cause)
    }
    // console.log(`${email} has logged in`)
    redirect('/')

}


const register = async (formData: FormData) => {
    const { hash } = bcrypt
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!(username && email && password)) throw new Error('Please fill all fields')

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error('User already exist!')

    const hashedPassword = await hash(password, 10)
    await User.create({ username, email, password: hashedPassword })

    console.log('User succesfully created!')
    try {
        await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password
        })
    } catch (error) {
        const err = error as CredentialsSignin
        console.log(err.cause)
    }
    // console.log(`${email} has logged in`)
    redirect('/')

}

const github = async () => {
    await signIn('github')
}
const google = async () => {
    await signIn('google')
}

const logout = async () => {
    await signOut()
}


export { register, login, github, google, logout }