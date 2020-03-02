const axios = require('axios');
require('dotenv').config()


const getExchageRate = (from, to) => {
    return axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}&base=${from}`).then((response) => {
        return response.data.rates[to]
    });
}

const getCountries = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((respone) => {
        return respone.data.map((country) => country.name)
    });
}

// currently API supports only to EUR in free version
getExchageRate('EUR', 'CAD').then((convertedRate) => {
    // console.log(convertedRate);
})

// call countries API
getCountries('EUR').then((country) => {
    // console.log(country);
})

// promise based approach
const convertCurreny = (from, to, amount) => {
    return getCountries(to).then((tempCountry) => {
        cnt = tempCountry;
        return getExchageRate(from, to);
    }).then((rate) => {
        const exchangeRate = amount * rate;
        return `${amount} ${from} is worth ${exchangeRate} ${to} and can be spent in the following countries: ${cnt.join(', ')}`;
    });
};

// convertCurreny('EUR', 'USD', '4020').then((data) => console.log(data))

// async/await

const getExchageRateAlt = async (from, to) => {
    try {
        const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}&base=${from}`);
        return res.data.rates[to];
    } catch (e) {
        throw new Error(`Unable to reach sever to get exchage rate for ${from} country`)
    }
}

const getCountriesAlt = async (currency) => {
    try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
        return respone.data.map((country) => country.name)
    } catch (e) {
        throw new Error(`Unable to reach sever to get countries for ${currency}`)
    }
}


const convertCurrenyAlt = async (from, to, amount) => {
    try {
        const countries = await getCountriesAlt(to);
        const rate = await getExchageRateAlt(from, to);
    } catch (e) {
        console.log(e.message);
    }
    const exchangeRate = amount * rate;
    return `${amount} ${from} is worth ${exchangeRate} ${to} and can be spent in the following countries: ${countries.join(', ')}`;
}

convertCurrenyAlt('USD', 'INR', '4020').then((data) => console.log(data))