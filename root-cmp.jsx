import { MailIndex } from './apps/mail/views/mail-index.jsx';
import { MailEdit } from './apps/mail/views/mail-edit.jsx';
import { MailDetails } from './apps/mail/views/mail-details.jsx';
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
                <Route path="/mail" element={<MailIndex />} />
                <Route element={<MailEdit />} path="/mail/edit/" />
                <Route element={<MailEdit />} path="/mail/edit/:mailId" />
                <Route element={<MailDetails />} path="/mail/:mailId" />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
