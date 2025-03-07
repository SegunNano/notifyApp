'use client'


import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const NoteModal = ({ closeModal, modal, modalType, note, setNote, handleSubmit }: NoteModalType) => {
    const [newTag, setNewTag] = useState<string>('')
    const addTag = () => {
        if (!newTag.trim()) return;
        setNote((prev: NoteType) => ({
            ...prev,
            tags: [...prev.tags, newTag.trim()],
        }));
        setNewTag('');
    }
    return (
        <div id="hs-medium-modal" className={`bg-blue-950/90 hs-overlay size-full ${!modal && 'hidden'} fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none`} role="dialog" aria-labelledby="hs-medium-modal-label">
            <div className={` ${modal ? 'mt-14 opacity-100' : 'mt-0 opacity-0'} duration-1000 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto`}>
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                        <h3 id="hs-medium-modal-label" className="font-bold text-gray-800 dark:text-white text-xl">
                            {modalType === 'add' ? 'Add New Note' : 'Edit Note'}
                        </h3>
                        <button type="button" onClick={closeModal} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-medium-modal">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="tittle" className="modal-label">Note Title</label>
                                <input onChange={(e) => setNote({ ...note, title: e.target.value })} type="text" id="title" name='title' className="modal-input dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500" value={note.title} placeholder="Your title here" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="content" className="modal-label">Note Content</label>
                                <textarea onChange={e => setNote({ ...note, content: e.target.value })} id="content" name="content" rows={4} className="block p-4 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your note content here..." value={note.content} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="modal-label">Tag List</label>
                                <div className="modal-input mb-3" >{note.tags.length ? (
                                    <div className='flex gap-3 flex-wrap'>
                                        {note.tags.map(tag => (
                                            <div key={uuid()} className='flex items-center gap-1'>
                                                <span className='font-semibold'>#{tag} </span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                                    <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                                                </svg>
                                            </div>

                                        ))}
                                    </div>
                                ) : ('No tags here')}</div>
                                <div>
                                    <div className="sm:flex rounded-lg overflow-hidden">
                                        <input value={newTag} onChange={(e) => setNewTag(e.target.value)} type="text" id='tag' name='tag' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500 " />
                                        <button type='button' onClick={addTag} className="py-2.5 sm:py-3 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 sm:text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">Add to tag list </button>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{modalType === 'add' ? 'Create Note' : 'Update Note'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteModal
