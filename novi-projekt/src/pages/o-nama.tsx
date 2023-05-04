

export function Onama () {
    
    return (
        <div>
            <section className="section">
				<div className="box-main">
					<div className="firstHalf">
						<h1 className="text-big">
							Tvoj najbolji prijatelj
						</h1>
						<h3>
						        Dobrodošli u naš azil za životinje!
					    </h3>
						<p className="text-small">
                            Mi smo sklonište za životinje koje se brine o napuštenim i 
                            zlostavljanim životinjama. Naša misija je da osiguramo bezbrižnost, 
                            liječenje i udobnost životinja koje su nam povjerene, kao i da pronađemo
                            prave domove za svaku životinju koja prolazi kroz naše vrata.
                            U našem azilu životinje dobivaju sve što im je potrebno za udoban 
                            i sretan život. Imamo iskusno osoblje koje se brine o zdravlju i 
                            dobrobiti životinja i pruža im svu pažnju koju zaslužuju. Osim toga, 
                            nudimo veterinarske usluge, cijepljenje i sterilizaciju, kao i druge medicinske 
                            tretmane kada su potrebni.
                            Naš cilj je da našim životinjama pružimo kvalitetan život sve dok ne 
                            pronađu svoje nove domove. U tom procesu, radimo na tome da udomimo 
                            životinje u obitelji koje će im pružiti ljubav i brigu koju zaslužuju.
                            Ako želite da pomognete našem azilu, možete nas posjetiti i upoznati naše
                            životinje, volontirati kod nas, donirati hranu i opremu ili usvojiti životinju.
                            Hvala vam što ste posjetili naš azil i što podržavate našu misiju.
						</p>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="box-main">
					<div className="secondHalf">
						<h1 className="text-big" id="program">
							Gdje se nalazimo
						</h1>
						<div id='map'>
							<a href='https://goo.gl/maps/g1XRQLn17V7bHYqt5'>
								Pronađite nas na mapi
							</a>
						</div>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="box-main">
					<div className="secondHalf">
						<h1 className="text-big" id="program">
							KONTAKTIRAJTE NAS!
						</h1>
						<form>
                            <label>Ime i prezime:</label>
                            <input
                              id="name"
                              type="text"
                              required
                            />
                            <label>E-mail adresa:</label>
                            <input
                              id="email"
                              type="email"
                              required
                            />
                            <label>Poruka:</label>
                            <textarea
                              id="message"                            
                              required
                            />
                            <button type="submit">Pošalji</button>
                        </form>						
					</div>
				</div>
			</section>
        </div>
    )
}