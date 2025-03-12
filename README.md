# Capture Ideas, Anytime, Anywhere

Effortlessly jot down your thoughts, organize important notes, and keep track of ideas on the go. Stay productive with a seamless, intuitive experience designed to help you remember what matters most.

## Features

- 📌 **Pin Important Notes** – Easily access your most crucial notes by pinning them.
- 🔍 **Search Functionality** – Quickly find notes using keywords and tags.
- 🏷 **Tag System** – Categorize and filter your notes with custom tags.
- ✏ **Edit & Delete** – Modify or remove notes as needed.
- 📋 **Copy to Clipboard** – Quickly copy note content for easy sharing.
- 🌙 **Dark Mode Support** – Enjoy a comfortable reading and writing experience in low-light conditions.
- 🔐 **Secure Authentication** – User authentication with NextAuth.js for data security.
- ☁ **Cloud Sync** – Save and access your notes from any device (coming soon).

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:**NextApi, MongoDB (Mongoose ORM)
- **Authentication:** Auth.js
- **State Management:** useState, useEffect, useCallback

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/note-app.git
   cd note-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Notes
- `POST /api/notes` - Fetch all notes for a user.
- `POST /api/notes/create` - Create a new note.
- `PUT /api/notes/update` - Update an existing note.
- `DELETE /api/notes/delete` - Delete a note.

## Contribution

Feel free to contribute by submitting issues or pull requests. To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

MIT License © 2025 Fadipe Segun Raphael
