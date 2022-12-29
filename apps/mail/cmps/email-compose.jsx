export function MailCompose({ onSubmiMail, handleChange }) {


    return <section className="compose-mail">
        <form onSubmit={onSubmiMail}>
            <label htmlFor="to"></label>
            <input type="text"
                id="to"
                name="to"
                placeholder="To"
                onChange={handleChange}
            />
            <label htmlFor="subjet"></label>
            <input type="text"
                id="subjet"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
            />
            <label htmlFor="body"></label>
            <input type="text"
                id="body"
                name="body"
                onChange={handleChange}
            />
            <button>Send</button>
        </form>
    </section>
}