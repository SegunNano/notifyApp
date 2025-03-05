import React from 'react'
import Link from 'next/link'


const Navbar = () => {
    return (
        <>

            <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-[#2663eb] border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-black text-white md:mb-5">
                <nav className="relative max-w-[85rem] w-full mx-auto flex items-center justify-between gap-3 py-2 px-4 sm:px-3 lg:px-8">

                    <a className="flex-none font-semibold text-xl focus:outline-hidden focus:opacity-80  " href="#" aria-label="Brand">Notify</a>

                    <div className="md:order-3 flex justify-end items-center gap-x-1">
                        <div className="relative flex flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5">
                            <a className="p-2 w-full flex items-center text-sm hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#">
                                <svg className="shrink-0 size-4 me-3 md:me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Log in
                            </a>
                        </div>
                    </div>


                </nav>
            </header>

        </>
    )
}

export default Navbar
