
import CredentialsLoginFrom from '@/components/CredentialsLoginFrom'
import React from 'react'


const Login = () => {
    return (
        <div className="flex w-full items-center justify-center mt-10">

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <CredentialsLoginFrom type={'Login'} />
            </div>
        </div>
    )
}

export default Login
