'use client'
import { useState, useCallback, useEffect } from 'react'
import NoteCard from "./NoteCard";
import NoteModal from './NoteModal';
import { mockNotes } from '@/lib/testDb';
import { redirect, useRouter } from 'next/navigation';
import { User } from 'next-auth';


const UserHomePage = ({ userInfo }: { userInfo?: User }) => {
    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [note, setNote] = useState<NoteType>({ title: '', tags: [], content: '' })
    const [notesArr, setNotesArr] = useState<NoteType[]>([])
    const [noteId, setNoteId] = useState(false)
    const [author, setAuthor] = useState('')
    const [modalType, setModalType] = useState<ModalType>('add')
    const [submitting, setSubmitting] = useState(false);


    const fetchNotes = useCallback(async () => {
        if (!userInfo?.id) return;
        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify({
                    author: userInfo?.id
                })
            });
            const data = await res.json();
            setNotesArr(data)
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    }, [userInfo?.id]);
    const openModal = () => {
        setNote({ title: '', tags: [], content: '' })
        setModal(prv => true)
        setModalType('add')
    }
    const openEditModal = (n: NoteType) => {
        setNote((prv: NoteType) => ({ ...prv, ...n }))
        setModal(prv => true)
        setModalType('edit')
    }
    const closeModal = () => {

        if (modal) {
            modal && setModal(prv => false)
            setAuthor(prv => '')
        }
    }
    const upDateNote = async () => {
        try {
            const res = await fetch('/api/notes/update', {
                method: 'PUT',
                body: JSON.stringify({
                    ...note, author: userInfo?.id
                })
            });
            res.ok && fetchNotes()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            closeModal()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Prevents form submission from making a GET request
        setSubmitting(true);

        if (modalType === 'add') {
            try {
                const res = await fetch('/api/notes/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...note, author: userInfo?.id
                    })
                });
                res.ok && fetchNotes()
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
                closeModal()
            }
        } else if (modalType === 'edit') {
            await upDateNote()
        }
    };
    const pinNote = async (n: NoteType) => {
        const isPinned = !n.isPinned
        try {
            const res = await fetch('/api/notes/update', {
                method: 'PUT',
                body: JSON.stringify({
                    ...n, isPinned
                })
            });
            res.ok && fetchNotes()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            closeModal()
        }
    }
    const deleteNote = async (n: NoteType) => {
        try {
            const res = await fetch('/api/notes/delete', {
                method: 'DELETE',
                body: JSON.stringify({
                    ...n
                })
            });
            res.ok && fetchNotes()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            closeModal()
        }
    }


    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);


    return (
        <>
            <button onClick={openModal} type="button" className="absolute top-20 right-5 p-2 inline-flex items-center gap-x-2 text-sm font-medium border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none rounded-full" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-7">
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
            </button>
            <div onClick={closeModal} className="max-w-[85rem] mt-7 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
                    {notesArr.map(note => (<NoteCard key={note._id.toString()} note={note} openEditModal={openEditModal} pinNote={pinNote} deleteNote={deleteNote} />))}

                </div>
            </div>
            <NoteModal modal={modal} modalType={modalType} closeModal={closeModal} note={note} setNote={setNote} handleSubmit={handleSubmit} />
        </>
    )
}

export default UserHomePage
