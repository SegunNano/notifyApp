type credentialsLoginFromProps = {
  type: "Login" | "Register";
};

type NoteModalType = {
  note: NoteType;
  modal: boolean;
  modalType: "add" | "edit";
  closeModal: () => void;
  setNote: Dispatch<
    SetStateAction<{ title: string; content: string; tags: string[] | never[] }>
  >;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type NoteType = {
  title: string;
  content: string;
  tags: string[] | never[];
  isPinned?: boolean;
  _id?: mongoose.Types.ObjectId;
  author?: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
};
type ModalType = "add" | "edit";

type UpdateNoteFuncType = (note: NoteType) => void;

type NoteCardType = {
  note: NoteType;
  openEditModal: UpdateNoteFuncType;
  pinNote: UpdateNoteFuncType;
  deleteNote: UpdateNoteFuncType;
  tagSearch: (tag: string) => void;
};
