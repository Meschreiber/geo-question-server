const fs = require('fs');

const countries = JSON.parse(fs.readFileSync('utils/aggregated_country_data.JSON'))
let questionId = 0;
let answerID = 0;

function randomCountry(countries) {
    const randomInt = Math.floor(Math.random() * Math.floor(countries.length));
    return countries[randomInt];
}

function genericQuestionGenerator({ rawText, questionProp, answerProp, numAnswers = 5 }) {
    return function () {
        const id = questionId++;
        let answerCountry = randomCountry(countries)

        while (!(answerCountry[questionProp] && answerCountry[answerProp] && answerCountry.Name)) {
            answerCountry = randomCountry(countries)
        }

        const text = rawText.replace('ANSWER', answerCountry[questionProp])
        let answers = [];

        if (Array.isArray(answerCountry[answerProp])) {
            answers = answerCountry[answerProp].map(answer => ({
                questionId: id,
                text: answer,
                valid: true,
                id: answerID++
            }))
        } else {
            answers = [{
                questionId: id,
                text: answerCountry[answerProp],
                valid: true,
                id: answerID++
            }]
        }

        for (let i = answers.length; i < numAnswers; i++) {
            let currentCountry = randomCountry(countries);
            let possibleAnswer = Array.isArray(currentCountry[answerProp]) ? currentCountry[answerProp][0] : currentCountry[answerProp];

            while (!(currentCountry[answerProp] && currentCountry.Name) || answers.map(answer => answer.text).includes(possibleAnswer)) {
                currentCountry = randomCountry(countries)
                possibleAnswer = Array.isArray(currentCountry[answerProp]) ? currentCountry[answerProp][0] : currentCountry[answerProp];
            }

            answers[i] = {
                questionId: id,
                text: possibleAnswer,
                valid: false,
                id: answerID++
            }
        }

        return {
            id,
            topic: 'Geography',
            text,
            answers: answers.slice(0, numAnswers)
        }
    }

}

const capitalCityQuestion = genericQuestionGenerator({ rawText: 'ANSWER is the capital city of which country or territory?', questionProp: 'Capital (exonym)', answerProp: 'Name' })
const capitalCityQuestion2 = genericQuestionGenerator({ rawText: 'What is the capital city of ANSWER?', questionProp: 'Name', answerProp: 'Capital (exonym)' })
const languageQuestion = genericQuestionGenerator({ rawText: "Which of these are official languages of ANSWER? (Select all that apply.)", questionProp: "Name", answerProp: "Official or native language(s) (alphabet/script)" })

// How many countries does {} border?
function borderQuestion() {
    const id = questionId++;
    let answerCountry = randomCountry(countries)

    while (!(answerCountry['No. of unique land neighbours'] && answerCountry.Name)) {
        answerCountry = randomCountry(countries)
    }

    const text = `How many other countries does ${answerCountry.Name} share a land border with?`
    const answers = [{
        questionId: id,
        text: answerCountry['No. of unique land neighbours'],
        valid: true,
        id: answerID++
    }]

    for (let i = 1; i < 5; i++) {
        let borders = Math.floor(Math.random() * 7);
        while (answers.map(answer => answer.text).includes(borders)) {
            borders = Math.floor(Math.random() * 7);
        }
        answers[i] = {
            questionId: id,
            text: borders,
            valid: false,
            id: answerID++
        }
    }
    return {
        id,
        topic: 'Geography',
        text,
        // answers
    }
}

function highestLowestQuestionGenerator({ highOrLow, prop, rawText, numAnswers = 5 }) {
    // if (highOrLow === 1) high else low
    return function () {
        const id = questionId++;
        let answerCountry = randomCountry(countries)

        while (!(answerCountry.Continent && answerCountry[prop] && answerCountry.Name)) {
            answerCountry = randomCountry(countries)
        }

        const answerContinent = answerCountry.Continent
        const text = rawText.replace('CONTINENT', answerContinent).replace('HIGHLOW', highOrLow ? 'highest' : 'lowest').replace('PROP', prop)

        const countriesInContinent = countries.filter(country => country.Continent === answerContinent).filter(country => country[prop] !== undefined)

        answerCountry = countriesInContinent.reduce((acc, val) => {
            // console.log('Current', val, 'considering', acc.Name, acc[prop])
            if (highOrLow) {
                acc = (acc[prop] === undefined || val[prop] > acc[prop]) ? val : acc;
            } else {
                acc = (acc[prop] === undefined || val[prop] < acc[prop]) ? val : acc;
            }
            return acc;
        });

        const answers = [{
            questionId: id,
            text: answerCountry.Name,
            valid: true,
            id: answerID++
        }]

        for (let i = answers.length; i < numAnswers; i++) {
            let incorrectAnswer = randomCountry(countriesInContinent)

            while (incorrectAnswer.Name === answerCountry.Name || answers.map(answer => answer.text).includes(incorrectAnswer.Name)) {
                incorrectAnswer = randomCountry(countriesInContinent)
            }
            answers[i] = {
                questionId: id,
                text: incorrectAnswer.Name,
                valid: false,
                id: answerID++
            }
        }

        return {
            id,
            topic: 'Geography',
            text,
            answers: answers.slice(0, numAnswers)
        }
    }
}

const highestPopulationQuestion = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Population', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

const highestElevationQuestion = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Maximum elevation (m)', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

const lowestElevationQuestion = highestLowestQuestionGenerator({ highOrLow: 0, prop: 'Minimum elevation (m)', rawText: `What country or territory in CONTINENT  has the HIGHLOW PROP?`, numAnswers: 5 })

const highestLandArea = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Land Area in km2', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

// Not worth it
// const lowestLandArea = highestLowestQuestionGenerator( {highOrLow: 0, prop: 'Land Area in km2', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

// Only worth it for Canada
const highestTotalArea = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Total Area in km2', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

const highestTotalLengthBorders = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Total length of land borders (km)', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

const highestCoastline = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'km of coastline', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

const highestElevationSpan = highestLowestQuestionGenerator({ highOrLow: 1, prop: 'Elevation span', rawText: `What country or territory in CONTINENT has the HIGHLOW PROP?`, numAnswers: 5 })

function randomTrivia(numAnswers = 5) {
    const id = questionId++;
    const countriesWithTrivia = countries.filter(country => country.Trivia && country.Trivia.length)
    const randomTrivia = randomCountry(countriesWithTrivia).Trivia[0]

    const text = `For which country is the following a true statement? (Select all that apply.) ${randomTrivia}`
    let answerCountries = countriesWithTrivia.filter(country => country.Trivia.includes(randomTrivia))
    let answers = answerCountries.map(answer => ({
        questionId: id,
        text: answer.Name,
        valid: true,
        id: answerID++
    }))


    for (let i = answers.length; i < numAnswers; i++) {
        let incorrectCountry = randomCountry(countries)
        while (!incorrectCountry.Name || answers.map(answer => answer.text).includes(incorrectCountry.Name)) {
            incorrectCountry = randomCountry(countries)
        }
        answers[i] = {
            questionId: id,
            text: incorrectCountry.Name,
            valid: false,
            id: answerID++
        }
    }
    return {
        id,
        topic: 'Geography',
        text,
       answers:  answers.slice(0, numAnswers)
    }

}

console.log(capitalCityQuestion())
console.log(capitalCityQuestion2())
console.log(languageQuestion())
console.log(borderQuestion())
console.log(highestPopulationQuestion())
console.log(highestLandArea())
console.log(highestTotalArea())
console.log(highestCoastline())
console.log(highestTotalLengthBorders())
console.log(highestElevationSpan())
console.log(highestElevationQuestion())
console.log(lowestElevationQuestion())
console.log(randomTrivia())





