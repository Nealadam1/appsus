export function Home() {

    return <section className="home">
        <h1>Welcome to App sus, where you can use our mailing and notes system</h1>
        <div className="svg-container">
            <div className="svg-content">
                <img src="assets\img\Mail.svg" alt="" />
                <h2>Mails</h2>

            </div>
            <div className="svg-content">
                <img src="assets\img\Tasks.svg" alt="" />
                <h2>Notes</h2>
            </div>
        </div>
    </section>
}