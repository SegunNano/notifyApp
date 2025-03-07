type credentialsLoginFromProps = {
    type: 'Login' | 'Register',
}

type NoteModalType = {
    note: NoteType;
    modal: boolean;
    modalType: 'add' | 'edit';
    closeModal: () => void;
    setNote: Dispatch<SetStateAction<{ title: string; content: string; tags: string[] | never[]; }>>;
    handleSubmit: () => void
}

type NoteType = { title: string; content: string; tags: string[] | never[] }
type ModalType = 'add' | 'edit'