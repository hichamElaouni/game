import school from "../../Image/school.jpg";

export default function About() {
    return (
        <>
            <h1>About</h1>
            <div className="About">
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto quia
                    natus aliquam deleniti similique maiores voluptatem, veritatis minima
                    rerum quas necessitatibus expedita nulla, magni, id sapiente porro
                    atque exercitationem laudantium.
                </p>
                <img src={school} alt="" />
            </div>
        </>
    );
}
