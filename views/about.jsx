
export function About() {
    return <section className="about">
        <h1>About us</h1>
        <div className="features">

            <div className="about guy"><h2>Guy Pe'er</h2>
                <p>30 Years old Full Stack Developer, located at Rosh Haayin. <br />
                    Feel free to reach me via any of the links below.</p>
                <img className="profile" src='./assets/img/peer.jpg'></img>
                <ul className="social">
                    <li><a href="https://www.linkedin.com/in/guy-pe-er-664962254/"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a href="https://www.facebook.com/guy.peer/"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href="https://github.com/GuyPeer1"><i className="fa-brands fa-github"></i></a></li>
                </ul>
            </div>
            <div className="about guy"><h2>Guy Lazarof</h2>
                <p>25 Years old Full Stack Developer, located at Ashdod. <br />
                    Feel free to reach me via any of the links below.</p>
                <img className="profile" src='./assets/img/lazarof1.png'></img><ul className="social">
                    <li><a href="https://www.linkedin.com/in/guy-lazarof/"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a href="https://github.com/guy-lazarof"><i className="fa-brands fa-github"></i></a></li>
                </ul></div>
        </div>
    </section>
}
