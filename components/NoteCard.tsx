import React, { useState } from 'react'
import { Copy, Delete, Edit, Okay, Pin } from './ui/Svg';

const NoteCard = ({ note, openEditModal, pinNote, deleteNote }: NoteCardType) => {
  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(note.content);
        setCopied(note.content);
        setTimeout(() => setCopied(''), 3000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = note.content;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(note.content);
        setTimeout(() => setCopied(''), 3000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    }
  };


  const [copied, setCopied] = useState('');
  return (
    <div className="border border-gray-200 border-t-4 border-t-blue-600 flex flex-col bg-white  shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {note.title}
        </h3>

        <div className="flex items-center gap-x-1">
          <div className="hs-tooltip inline-block">
            <button onClick={() => pinNote(note)} type="button" className="hs-tooltip-toggle size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
              <Pin pinned={note.isPinned} />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700" role="tooltip">
                Pin
              </span>
            </button>
          </div>

          <div className="hs-tooltip inline-block">
            <button type="button" onClick={() => openEditModal(note)} className="hs-tooltip-toggle size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
              <Edit />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700" role="tooltip">
                Edit
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block">
            <button onClick={handleCopy} type="button" className="hs-tooltip-toggle size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
              {copied === note.content ? <Okay /> : <Copy />}
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700" role="tooltip">
                {copied === note.content ? 'Copy' : 'Copied'}
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block">
            <button onClick={() => deleteNote(note)} type="button" className="hs-tooltip-toggle size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
              <Delete size={'big'} />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700" role="tooltip">
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
          {note.content}
        </p>
        <div className="mt-3">
          <div className="inline-flex items-center text-sm hover:underline cursor-pointer">
            <span className="text-blue-600 dark:text-neutral-400 italic">#Legend indicator</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-200 rounded-b-xl py-3 px-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500 italic">
          <span className="font-semibold">Date Created: </span>
          {note.createdAt ? new Date(note.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : "N/A"}
        </p>
      </div>
    </div>
  )
}

export default NoteCard
