'use client'
import { useState } from 'react'
import NoteCard from "./NoteCard";
import NoteModal from './NoteModal';

const UserHomePage = () => {
    const [modal, setModal] = useState(false)
    const [note, setNote] = useState<NoteType>({ title: '', tags: [], content: '' })
    const [noteId, setNoteId] = useState(false)
    const [modalType, setModalType] = useState<ModalType>('add')
    const openModal = () => {
        setModal(prv => true)
        setModalType('add')
    }
    const openEditModal = () => {
        console.log('here')
        setModal(prv => true)
        setModalType('edit')
    }
    const closeModal = () => {
        modal && setModal(prv => false)
    }
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(note)
    }
    return (
        <>
            <button onClick={openModal} type="button" className="absolute top-20 right-5 p-2 inline-flex items-center gap-x-2 text-sm font-medium border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none rounded-full" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-7">
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
            </button>
            <div onClick={closeModal} className="max-w-[85rem] mt-7 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
                    <NoteCard pinned={true} openEditModal={openEditModal} />
                    <NoteCard pinned={true} openEditModal={openEditModal} />
                    <NoteCard pinned={false} openEditModal={openEditModal} />
                    <NoteCard pinned={true} openEditModal={openEditModal} />
                    <NoteCard pinned={true} openEditModal={openEditModal} />
                    <NoteCard pinned={false} openEditModal={openEditModal} />
                    <NoteCard pinned={false} openEditModal={openEditModal} />
                    <NoteCard pinned={true} openEditModal={openEditModal} />
                    <NoteCard pinned={false} openEditModal={openEditModal} />

                </div>
            </div>
            <NoteModal modal={modal} modalType={modalType} closeModal={closeModal} note={note} setNote={setNote} handleSubmit={handleSubmit} />
        </>
    )
}

export default UserHomePage
