const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"

import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail.details.jsx"
import { MailAdd } from "./apps/mail/views/mail-add.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"

import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { LabelEdit } from "./cmps/label-edit.jsx"
import { AddNote } from "./apps/note/cmps/add-note.jsx"
import { DynamicCmpEdit } from "./apps/note/cmps/dynamic-cmps/dynamic-cmp-edit.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/mail" element={<MailIndex />} >
                        <Route path="/mail/compose" element={<MailAdd />} />
                    </Route>

                    <Route path="/mail/:id" element={<MailDetails />} />

                    <Route path="/note" element={<NoteIndex />}>
                        <Route path="/note/labeledit" element={<LabelEdit />} />
                        <Route path="/note/add" element={<DynamicCmpEdit />} />
                        <Route path="/note/edit/:noteId"></Route>
                    </Route>
                   
                </Routes>
            </main>
            <UserMsg />
        </section>

    </Router>
}
