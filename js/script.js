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

const BASE_URL = 'https://api.rawg.io/api/games';
const API_KEY = '';

// event listeners
$('form').on('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    let gameName = $searchBar.val().replace(/ /g, '-');
    $.ajax(`${BASE_URL}/${gameName}`).then((data) => {
        gameData = $(data);
        console.log(gameData);
        render(); 
    }, (error) => {
        console.log('Bad request', error);
        alert(`Sorry, that is not a valid game title entry`);
    });
    $searchBar.val('');
};

const render = () => {
    if (gameData) {
        $name.text(gameData[0].name);
        $description.text(gameData[0].description_raw);
        if (gameData[0].publishers[0] !== null && gameData[0].publishers[0] !== null && !!gameData[0].publishers[0].name) {
            $publisher.text(gameData[0].publishers[0].name);
        } else {
            $publisher.hide();
            $('#p').hide();
        }
        if (!!gameData[0].metacritic) {
            $metacritic.text(`${gameData[0].metacritic}/100`);
        } else {
            $metacritic.hide();
            $('#m').hide();
        }
        if (gameData[0].esrb_rating !== null && !!gameData[0].esrb_rating.name) {
            $rating.text(gameData[0].esrb_rating.name);
        } else {
            $rating.hide();
            $('#r').hide();
        }
        if (!!gameData[0].released) {
            $releaseDate.text(gameData[0].released);
        } else {
            $releaseDate.hide();
            $('#re').hide();
        }
        if (gameData[0].genres.length === 1) {
            $genres.text(`${gameData[0].genres[0].name}`);
        } else {
            $genres.text(`${gameData[0].genres[0].name}, ${gameData[0].genres[1].name}`);
        }
        if (!!gameData[0].website) {
            $website.text(gameData[0].website);
            $website.attr('href', gameData[0].website);
        } else {
            $('#w').hide();
        }
        if (!!gameData[0].background_image) {
            $screenshot1.attr('src', gameData[0].background_image);
        }
        if (!!gameData[0].background_image_additional) {
            $screenshot2.attr('src', gameData[0].background_image_additional);
        }
    }
};
