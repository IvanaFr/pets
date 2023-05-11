export function ContactForm() {
    return (
        <div className="contactForm">
            <form>
                <label>Ime i prezime:</label>
                <input id="name" type="text" required />
                <label>E-mail adresa:</label>
                <input id="email" type="email" required />
                <label>Poruka:</label>
                <textarea id="message" required />
                <button type="submit">Pošalji</button>
            </form>
        </div>
    );
}
