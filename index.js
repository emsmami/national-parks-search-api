'use strict'

const apiKey = 'z5UamSS2tY6wiHIGqaDAN45vz0U1M4VHB55z8U0n';



function formatUrl(stateValue, maxLimit) {
    let params = `stateCode=${stateValue}&limit=${maxLimit}&api_key=${apiKey}`
    return params;
}

function stateSearch(stateValue, maxLimit) {
    const newParams = formatUrl(stateValue, maxLimit)
    const newUrl = `https://developer.nps.gov/api/v1/parks?${newParams}`
    /*const options = {
        headers: new Headers({
           "X-Api-Key": apiKey
        })
    };*/

    console.log(newUrl);
    fetch(newUrl)

        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('response.statusText');
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Oops there it is. ${error.message}`)
        })
}

function displayResults(responseJson) {
    let parkList = responseJson.data;

    console.log(parkList.length);
    for (let i = 0; i < parkList.length; i++) {
        $('.results').append(
            `<li id="js-list-item"><h3>${parkList[i].fullName}</h3>
        <p>${parkList[i].description}</p>
        <p><a href="${parkList[i].url}" target="_blank">${parkList[i].url}</a></p>
        </li><hr>`
        )
    }
    $('.results').removeClass('hidden');
}

function chooserListener() {
    $('form').submit(event => {
        event.preventDefault();
        $('.results').empty();
        $('.js-error-message').empty();
        let stateValue = $('#userInput').val();
        let maxLimit = $('#maxLimitInput').val();
        stateSearch(stateValue, maxLimit);
    });
}

chooserListener();