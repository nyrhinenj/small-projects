// alustetaan tarvittavat muuttujat
let input = [];
let random = [];
let args = process.argv.slice(2); // poistetaan syötteestä kaksi ensimmäistä indexiä
let years = 0;
let week = 0;

// hoidetaan syötteen validaatio, onko syötteessä "log vai ei"
if (args.includes('log')) {
    validateLog();
} else {
    validate();
}

// validointi, jos syötteessä ei ole "log"
function validate() {
    // tarkistetaan, että tarpeeksi monta syötettä annettu
    if (args.length !== 7) {
        console.log("Error: Give 7 values");
    } else {
        // tarkistetaan, että kaikki syötteet ovat numeroita
        let allNumbers = true;
        for (let i = 0; i < args.length; i++) {
            if (isNaN(parseInt(args[i]))) {
                console.log("Error: all values must be numbers");
                allNumbers = false;
                break;
            }
            // tarkistetaan, että annetut numerot on väliltä 1-40
            if (parseInt(args[i]) < 1 || parseInt(args[i]) > 40) {
                console.log("Error: all values must be from range 1-40");
                allNumbers = false;
                break;
            }
        }
        // tarkistetaan, että käyttäjä antaa vain uniikkeja numeroita
        if (allNumbers) {
            let noDuplicates = true;
            // käydään läpi kaikki taulukon arvot ja katsotaan löytyykö duplikaatteja
            for (let i = 0; i < args.length; i++) {
                for (let j = i + 1; j < args.length; j++) {
                    if (args[i] == args[j]) {
                        console.log("Error: all values must be unique");
                        noDuplicates = false;
                        break;
                    }
                }
                if (!noDuplicates) break;
            }
            // jos kaikki on kunnossa, kutsutaan jackpot-funktiota
            if (noDuplicates) {
                jackpot();
            }
        }
    }
}

// validointi, jos syötteessä on "log"
function validateLog() {
    // poistetaan taulukon viimeisen indexin sisältö eli sana "log", jotta vertailu helpompaa
    args.pop();
    // tarksitetaan, että oikea määrä syötteitä annettu
    if (args.length !== 7) {
        console.log("Error: Give 7 values");
    } else {
        // tarkistetaan, että annetut syötteet on numeroita
        let allNumbers = true;
        for (let i = 0; i < args.length; i++) {
            if (isNaN(parseInt(args[i]))) {
                console.log("Error: all values must be numbers");
                allNumbers = false;
                break;
            }
            // tarkistetaan, että annetut numerot on väliltä 1-40
            if (parseInt(args[i]) < 1 || parseInt(args[i]) > 40) {
                console.log("Error: all values must be from range 1-40");
                allNumbers = false;
                break;
            }
        }
        // jos syöte on oikea, kutsutaan jackpotLog funktiota
        if (allNumbers) {
            jackpotLog();
        }
    }
}

// käydään käyttäjän syöte läpi
function user() {
    // tyhjennetään taulukko, jotta funktiota kutsuessa, uudet tiedot eivät tallennu aina uudestaan toistensa perään vaan ne tallentuvat tyhjään taulukoon
    input = [];
    // käydään läpi jokainen käyttäjän antama argumentti ja tallennetaan ne oikeassa muodossa taulukkoon
    for (let i = 0; i < args.length; i++) {
        let number = parseInt(args[i]);
        // tarkistetaan, onko numero pienempää kuin 10. Jos on, lisätään eteen 0, jos ei lisätään se merkkijonona taulukkoon
        let formattedNumber = number < 10 ? '0' + number : number.toString();
        input.push(formattedNumber)
    }
    return input; // palautetaan muodostunut taulukko
}

// arvotaan lottorivin oikeat numerot
function lottoNumber() {
    // tyhjennetään taulukko, jotta funktiota kutsuessa, uudet tiedot eivät tallennu aina uudestaan toistensa perään vaan ne tallentuvat tyhjään taulukoon
    random = [];
    // arvotaan 7 numeroa
    while (random.length < 7) {
        let randomNumber = Math.floor(Math.random() * 40) + 1;
        // tarkistetaan, onko numero pienempää kuin 10. Jos on, lisätään eteen 0, jos ei lisätään se merkkijonona taulukkoon
        let formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber.toString();
        // tarkistetaan vielä, että arvottua numeroa ei ole jo taulukossa. Jos numero löytyy taulukosta, ei sitä lisät
        if (!random.includes(formattedNumber)) {
            random.push(formattedNumber);
        }
    }
    return random; // palautetaan muodostunut taulukko
}

// funktio, joka tarkistaa lottorivin
function jackpot() {
    // alustetaan tarvittavat muuttujat
    let gotJackpot = 7;
    let highscore = 0;
    let correct = 0;
    // käydään taulukoita läpi, kunnes saadaan jackpot
    while (highscore !== gotJackpot) {
        // kutsutaan funktioita, jotka antavat uudet taulukot
        user();
        lottoNumber();
        // varmistetaan, että oikein numeroiden määrä on 0, ennen numeroiden vertailua
        correct = 0;
        // verrataan taulukoita, löytyykö niistä samoja numeroita
        correct = input.filter(num => random.includes(num)).length;
        // jos oikeiden numeroiden määrä on suurempi kuin ennätys, päivitetään ennätys, ja tulostetaan uusi oikeiden numeroiden määrä
        if (correct > highscore) {
            highscore = correct;
            console.log(`You got ${highscore} correct`);
        }
        // kutsutaan aika funktiota jokaisen vertailun jälkeen, jotta tiedetään kauanko jackpotin saavuttamisessa kestää
        time();

    }
    // kun jackpot saadaan, tulostetaan siihen kulunut aika näkyviin
    console.log(`It took ${time()} years`);
}

// funktio, joka tarkistaa lottorivin, kun käyttäjä on antanut syötteeseen "log"
function jackpotLog() {
    let gotJackpot = false;
    // toistetaan vertailu, kunnes saadaan jackpot
    while (!gotJackpot) {
        // kutsutaan funktioita, jotka antavat uudet taulukot
        user();
        lottoNumber();
        // tulostetaan käyttäjän antama ja oikea lottorivi näkyviin
        console.log(`User: ${input.join(' ')}`);
        console.log(`Random: ${random.join(' ')}`);
        // muutetaan taulukoiden sisällöt numeroiksi vertailua varten ja muutetaan ne muodosta 01 muotoon 1. Vertaillaan numeroiden suhdetta toisiinsa ja järjestetään ne pienimmästä suurimpaan
        let sortedUser = input.map(num => parseInt(num, 10)).sort((a, b) => a - b);
        let sortedLottoNumber = random.map(num => parseInt(num, 10)).sort((a, b) => a - b);
        // verrataan taulukkojen arvoja toisiinsa indeksi kerrallaan. Jos yksikin numero on eri, palautetaan false, jos kaikki on samat, palautetaan true
        gotJackpot = sortedUser.every((num, index) => num === sortedLottoNumber[index]);
        //lasketaan jackpotin saamiseen kulunut aika
        if (!gotJackpot) {
            time();
        } else {
            // tulostetaan kulunut aika näkyviin
            console.log(`It took ${time()} years!`)
        }
    }
}

// aika funktio, joka laskee jackpotin saamiseen kulunutta aikaa
function time() {
    // funktiota kutsuttaessa lisätään kuluneeseen aikaan viikko lisää
    week++;
    // jos on kulunut 52 vko, lisätään aika kuluneisiin vuosiin ja nollataan viikot
    if (week === 52) {
        years++;
        week = 0;
    }
    // palautetaan kulunut aika vuosina ylöspäin pyöristettynä
    return Math.ceil(years + week / 52);
}