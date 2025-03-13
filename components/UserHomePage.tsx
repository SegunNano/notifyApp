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
    const [modalType, setModalType] = useState<ModalType>('add')
    const [note, setNote] = useState<NoteType>({ title: '', tags: [], content: '' })
    const [notesArr, setNotesArr] = useState<NoteType[]>([])
    const [searchNotesArr, setSearchNotesArr] = useState<NoteType[]>([])
    const [submitting, setSubmitting] = useState(false);
    const [searchValue, setSearchValue] = useState('');


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
            setSearchNotesArr(data)
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
        if (!note.tags.length) return
        if (modalType === 'add') {
            try {
                const res = await fetch('/api/notes/create', {
                    method: 'POST',
                    body: JSON.stringify(note)
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
    const handleSearch = () => {
        console.log(searchValue)
    }
    const tagSearch = (tag: string) => {
        setSearchValue(prv => tag)
    }

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);
    useEffect(() => {
        filterSearch();
    }, [searchValue]); // Runs filterSearch when searchValue changes

    const filterSearch = () => {
        if (!searchValue.trim()) {
            setNotesArr(searchNotesArr);
            return; // Stop execution
        }

        const lowerCased = searchValue.toLowerCase();
        const searchRes = searchNotesArr.filter(({ content, title, tags }) =>
            [content, title].some(field =>
                field?.toLowerCase().includes(lowerCased)
            ) || tags.some(tag => tag.toLowerCase().includes(lowerCased)) // Check tags
        );

        setNotesArr(searchRes);
    };



    return (
        <>
            <div className='p-4 grid gap-5 grid-cols-12'>
                <div className='col-span-10'>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>

                        </div>
                        <input onChange={(e) => setSearchValue(e.target.value)} type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={searchValue} placeholder="Search" required />

                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-end">
                    <button onClick={openModal} type="button" className="p-2 inline-flex items-center gap-x-2 text-sm font-medium border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none rounded-full" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                        <span className='hidden md:block'> Add Note</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-7">
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div onClick={closeModal} className="max-w-[85rem] px-3 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
                    {notesArr.length
                        ? notesArr.map(note => (<NoteCard key={note._id.toString()} note={note} openEditModal={openEditModal} pinNote={pinNote} deleteNote={deleteNote} tagSearch={tagSearch} />))
                        : (
                            <div>
                                You have note at the moment.
                            </div>
                        )}

                </div>
            </div>
            <NoteModal modal={modal} modalType={modalType} closeModal={closeModal} note={note} setNote={setNote} handleSubmit={handleSubmit} />
        </>
    )
}

export default UserHomePage
