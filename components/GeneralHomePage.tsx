import React from 'react'
import Link from 'next/link'

const GeneralHomePage = () => {
  return (
    <>
<div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

    <div className="mt-5 max-w-2xl text-center mx-auto">
      <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
Capture ideas, {' '}
        <span className="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">Anytime, Anywhere</span>
      </h1>
    </div>

    <div className="mt-5 max-w-3xl text-center mx-auto">
      <p className="text-lg text-gray-600 dark:text-neutral-400">Effortlessly jot down your thoughts, organize important notes, and keep track of ideas on the go. Stay productive with a seamless, intuitive experience designed to help you remember what matters most.</p>
    </div>

    <div className="mt-8 gap-3 flex justify-center">
      <Link className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-hidden focus:from-violet-600 focus:to-blue-600 py-3 px-4" href="/login">
        Get started
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
        </svg>
      </Link>
    </div>

  </div>
</div>
{/* End Hero */}
    </>
  )
}

export default GeneralHomePage
