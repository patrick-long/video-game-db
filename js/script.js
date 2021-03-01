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
    console.log(gameName);
    $.ajax(`${BASE_URL}/${gameName}`).then((data) => {
        gameData = data;
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
        $name.text(gameData.name);
        $description.text(gameData.description_raw);
        if (gameData.publishers[0].name) {
            $publisher.text(gameData.publishers[0].name);
        } else {
            $publisher.text('N/A');
        }
        if (gameData.metacritic) {
            $metacritic.text(`${gameData.metacritic}/100`);
        } else {
            $metacritic.text('N/A');
        }
        if (gameData.esrb_rating.name) {
            $rating.text(gameData.esrb_rating.name);
        } else {
            $rating.text('N/A');
        }
        if (gameData.released) {
            $releaseDate.text(gameData.released);
        } else {
            $releaseDate.text('N/A');
        }
        if (gameData.genres.length === 1) {
            $genres.text(`${gameData.genres[0].name}`);
        } else {
            $genres.text(`${gameData.genres[0].name}, ${gameData.genres[1].name}`);
        }
        if (gameData.website) {
            $website.text(gameData.website);
            $website.attr('href', gameData.website);
        } else {
            $website.text('N/A');
            $website.attr('href', '#');
        }
        if (gameData.background_image) {
            $screenshot1.attr('src', gameData.background_image);
        }
        if (gameData.background_image_additional) {
            $screenshot2.attr('src', gameData.background_image_additional);
        }
    }
};