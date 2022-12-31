const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <h1>Welcome to AppSus!</h1>
        <div className="features">
            <Link to={`/mail`}>
                <div className="home feature"><h2>Mail</h2>
                    <p>Manage your emails and stay organized.</p>
                    <img src ='./assets/img/gmail.png'></img>
                    </div> </Link>
            <Link to={`/note`}><div className="home feature"><h2>Notes</h2>
                <p>Take notes and save important information.</p>
                <img src ='./assets/img/keep.png'></img></div>
                </Link>
        </div>
    </section>
}