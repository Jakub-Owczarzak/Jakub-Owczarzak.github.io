const slideArr = [{
        img: "images/img1.jpg",
        text: "Projekt 1"

    },
    {
        img: "images/img2.jpg",
        text: "Projekt 2"
    },
    {
        img: "images/img3.jpg",
        text: "Projekt 3"
    }
];
const imgElement = document.querySelector("img.slider");
const h1Element = document.querySelector("h1.slider");
const dots = [...document.querySelectorAll(".dots span")];

//Interfejs

const time = 5000;
let active = 0;
// Implementacje
const changeDot = () => {
    // Znajduję w tablicy element który posiada już klasę active i przypisuję do zmiennej activeDot
    const activeDot = dots.findIndex(el => el.classList.contains("active"));
    // Usuwam z aktywnej kropki klasę.
    dots[activeDot].classList.remove("active");
    // Dodaje klasę do klikniętego elementu.
    dots[active].classList.add("active");
}

const changeSlideOnClick = () => {
    // Pobieramy z obiektu elelemtny po indeksie aktywnego slidu
    imgElement.src = slideArr[active].img;
    h1Element.textContent = slideArr[active].text;
    changeDot();
}

const changeSlideRight = () => {
    // Zwiększamy i przesuwamy indeks tablicy z obrazkami w prawo
    active++;
    // Jeśli dojdziemy do końca tablicy przenosimy się na jej początek
    if (active === slideArr.length) {
        active = 0;
    }
    // Pobieramy z obiektu elelemtny po indeksie aktywnego slidu
    imgElement.src = slideArr[active].img;
    h1Element.textContent = slideArr[active].text;
    // Wywołujemy fikncję zmieniającą kropkę
    changeDot();
}

const changeSlideLeft = () => {
    // Zmniejszamy i przesuwamy indeks tablicy z obrazkami w lewo
    active--;
    // Pobieramy z obiektu elelemtny po indeksie aktywnego slidu
    imgElement.src = slideArr[active].img;
    h1Element.textContent = slideArr[active].text;
    // Wywołujemy fikncję zmieniającą kropkę
    changeDot();
}
// Deklarujemy punkt przerwania funkcji setInterval()
let setIntervalBreakIndeks = 0;
// Nastawiamy nasłuchiwanie na wiele elementów posługijąc się forEach
dots.forEach((el) => {
    el.addEventListener("click", function () {
        // Przerywamy działający setInterval
        clearInterval(setIntervalBreakIndeks);
        // Usuwamy clasę wszystkim elementom.
        dots.forEach((el) => {
            el.classList.remove("active");
        })
        // Ustawiamy klasę na element kliknięty.
        this.classList.toggle("active");
        // Pobieramy indeks klikniętego elementu.
        active = dots.findIndex(el => el.classList.contains("active"));
        //Wywołujemy funkcję.
        changeSlideOnClick();
        // Uruchamiamy nową funkcję setInterval i przeypisujemy nowy punkt przerwania potrzebny do 
        // zastrzymania automatycznego slidera przy ponownym kliknięciu guzika
        setIntervalBreakIndeks = setInterval(changeSlideRight, time);
    })
})

// Funkcja ustawiająca zdarzenie na przyscisk strzałki 
window.addEventListener("keydown", (e) => {
    clearInterval(setIntervalBreakIndeks);
    // PObieramy kod klawisza do późniejszego wykorzystania
    console.log(e.keyCode, e.which);
    active = dots.findIndex(el => el.classList.contains("active"));
    console.log(active);

    // Deklarujemy finkcję switch
    switch (e.keyCode) {
        case 39:
            changeSlideRight()
            setIntervalBreakIndeks = setInterval(changeSlideRight, time);
            break;
        case 37:
            // Jęsli jesteśmy na początku tablicy/galerri aotomatycznie przenosi nas na ostatni index czyli na koniec
            if (active === 0) {
                active = slideArr.length;
            }
            changeSlideLeft();
            setIntervalBreakIndeks = setInterval(changeSlideRight, time);
            break;
        default:
            console.log("Wciśnij jakiś guzik.");
    }
})
