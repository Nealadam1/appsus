import { } from "../assets/"

export function About() {
    return <section className="about">
        <div className="img-content">
            <img src="assets\img\Portfolio-website.svg" alt="" />
        </div>

        <div className="programmer-data">
            <div className="prog">
                <img src="assets\img\Detective.svg" alt="" />
                <h3>Neal Adam</h3>
                <h4>Fullstack developer</h4>
            </div>

            <div className="prog">
                <img src="assets\img\Design.svg" alt="" />
                <h3>Liron Kruchinin</h3>
                <h4>Fullstack developer</h4>
            </div>
        </div>
    </section>
}
