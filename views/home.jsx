const { Link } = ReactRouterDOM


export function Home() {

    return <section className="home">
        <h1>Welcome to App sus, where you can use our mailing and notes system</h1>
        <div className="svg-container">
            <div className="svg-content">
                <Link to="/mail">
                    <img src="assets\img\Mail.svg" alt="" />
                </Link>
                <h2>Mails</h2>

            </div>
            <div className="svg-content">
                <Link to="/note">
                    <img src="assets\img\Tasks.svg" alt="" />
                </Link>
                <h2>Notes</h2>
            </div>
        </div>

        <div className="about-page">
            <Link to="/about">
                <img src="assets\img\About.svg" alt="" />
            </Link>
            <h2>About</h2>
        </div>
    </section>
}