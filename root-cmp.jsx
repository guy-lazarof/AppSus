import { MailApp } from './apps/mail/views/mail-app.jsx';
import { MailDetails } from './apps/mail/views/mail-details.jsx';
import { MailIndex } from './apps/mail/views/mail-index.jsx';
import { EditNote } from './apps/note/cmps/edit-note.jsx';
import { NoteIndex } from './apps/note/views/note-index.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import { About } from './views/about.jsx';
import { Home } from './views/home.jsx';

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailApp />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                {/* <Route path="/:noteId" element={<NoteEdit />} /> */}
            </Routes>
        </section>
    </Router>
}
