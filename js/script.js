// state variables
let gameData;

// cached element references
const $name = $('#name');
const $description = $('#description');
const $publisher = $('#publisher');
const $metacritic = $('#metacritic');
const $rating = $('#rating');
const $releaseDate = $('#release-date');
const $genres = $('#genres');
const $website = $('#website');
const $screenshot1 = $('#screenshot1');
const $screenshot2 = $('#screenshot2');
const $copyright = $('#copyright');
const $searchBar = $('#search-bar');
const $publisherCheckbox = $('#checkbox1');
const $metacriticCheckbox = $('#checkbox2');
const $ratingCheckbox = $('#checkbox3');
const $releaseCheckbox = $('#checkbox4');
const $genresCheckbox = $('#checkbox5');
const $websiteCheckbox = $('#checkbox6');

const BASE_URL = 'https://api.rawg.io/api/games';
const API_KEY = '2382cc10c0784e578a1005c8d9b3c447';
const UPCOMING_URL = 'https://api.rawg.io/api/games?dates=2021-03-01,2021-12-31&ordering=-added';

// event listeners
$('form').on('submit', handleSubmit);

// default setting for checkboxes
$($publisherCheckbox).prop("checked", true);
$($metacriticCheckbox).prop("checked", true);
$($ratingCheckbox).prop("checked", true);
$($releaseCheckbox).prop("checked", true);
$($genresCheckbox).prop("checked", true);
$($websiteCheckbox).prop("checked", true);

// functions
function handleSubmit(event) {
    event.preventDefault();
    let gameName = $searchBar.val().replace(/ /g, '-');
    $.ajax(`${BASE_URL}/${gameName}?key=${API_KEY}`).then((data) => {
        gameData = $(data);
        console.log(gameData);
        renderUser(); 
    }, (error) => {
        console.log('Bad request', error);
        alert(`Sorry, that is not a valid game title entry`);
    });
    $searchBar.val('');
};

const renderUser = () => {
    if (gameData) {
        document.querySelector(".big-card").style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.querySelector(".big-card").style.height = "auto";
        $name.text(gameData[0].name);
        $('#d').html('Description:');
        $description.text(gameData[0].description_raw);
        if ($publisherCheckbox[0].checked === true) {
            if (gameData[0].publishers[0] !== null && gameData[0].publishers[0] !== null && !!gameData[0].publishers[0].name) {
                $('#p').html('Publisher:');
                $publisher.text(gameData[0].publishers[0].name);
            }
        } else {
            $publisher.hide();
            $('#p').hide();
        }
        if ($metacriticCheckbox[0].checked === true) {
            if (!!gameData[0].metacritic) {
                $('#m').html('Metacritic Rating:');
                $metacritic.text(`${gameData[0].metacritic}/100`);
            }
        } else {
            $metacritic.hide();
            $('#m').hide();
        }
        if ($ratingCheckbox[0].checked === true) {
            if (gameData[0].esrb_rating !== null && !!gameData[0].esrb_rating.name) {
                $('#r').html('ESRB Rating:');
                $rating.text(gameData[0].esrb_rating.name);
            }
        } else {
            $rating.hide();
            $('#r').hide();
        }
        if ($releaseCheckbox[0].checked === true) {
            if (!!gameData[0].released) {
                $('#re').html('Release Date:');
                $releaseDate.text(gameData[0].released);
            }
        } else {
            $releaseDate.hide();
            $('#re').hide();
        }
        if ($genresCheckbox[0].checked === true) {
            if (gameData[0].genres.length === 1) {
                $('#g').html('Genre(s):');
                $genres.text(`${gameData[0].genres[0].name}`);
            } else {
                $genres.text(`${gameData[0].genres[0].name}, ${gameData[0].genres[1].name}`);
            }
        } else {
            $('#g').text('');
            $genres.text('');
        }
        if ($websiteCheckbox[0].checked === true) {
            if (!!gameData[0].website) {
                $('#w').text('Website:');
                $website.text(gameData[0].website);
                $website.attr('href', gameData[0].website);
            }
        } else {
            $('#w').text('');
            $website.text('');
        }
        if (!!gameData[0].background_image) {
            $screenshot1.attr('src', gameData[0].background_image);
        }
        if (!!gameData[0].background_image_additional) {
            $screenshot2.attr('src', gameData[0].background_image_additional);
            $('#s').html('Additional Screenshot:');
        }
    }
};

// pulls data for upcoming top 5 upcoming games
$.ajax(`${UPCOMING_URL}?key=${API_KEY}`).then(data => {
    gameData = $(data);
    console.log(gameData);
    renderUpcoming(); 
}, error => {
    console.log('Bad upcoming games request', error);
});

const renderUpcoming = () => {
// first upcoming game details
    $('.upcomingCards').append(`<div class="upcomingCard1"><h2 class="name">${gameData[0].results[0].name}</h2><img src="${gameData[0].results[0].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[0].released}</p><p class="g">Genre: ${gameData[0].results[0].genres[0].name}</p></div><hr>`);

// second upcoming game details
    $('.upcomingCards').append(`<div class="upcomingCard2"><h2 class="name">${gameData[0].results[1].name}</h2><img src="${gameData[0].results[1].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[1].released}</p><p class="g">Genre: ${gameData[0].results[1].genres[0].name}</p></div><hr>`);

// third upcoming game details
    $('.upcomingCards').append(`<div class="upcomingCard3"><h2 class="name">${gameData[0].results[2].name}</h2><img src="${gameData[0].results[2].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[2].released}</p><p class="g">Genre: ${gameData[0].results[2].genres[0].name}</p></div><hr>`);

// fourth upcoming game details
    $('.upcomingCards').append(`<div class="upcomingCard4"><h2 class="name">${gameData[0].results[3].name}</h2><img src="${gameData[0].results[3].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[3].released}</p><p class="g">Genre: ${gameData[0].results[3].genres[0].name}</p></div><hr>`);

// fifth upcoming game details
    $('.upcomingCards').append(`<div class="upcomingCard5"><h2 class="name">${gameData[0].results[4].name}</h2><img src="${gameData[0].results[4].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[4].released}</p><p class="g">Genre: ${gameData[0].results[4].genres[0].name}</p></div>`);
};


