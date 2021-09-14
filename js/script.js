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
        // styles big card and container
        document.querySelector(".big-card").style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.querySelector(".big-card").style.height = "auto";
        document.querySelector(".container").style.height = "100%";
        // populates name data
        $name.text(gameData[0].name);
        //populates description and data
        $('#d').html('Description:');
        $description.text(gameData[0].description_raw);
        // populates publisher and data if checked
        if ($publisherCheckbox.prop('checked') === true) {
            if (!!gameData[0].publishers[0].name) {
                $('#p').html('Publisher:');
                $publisher.text(gameData[0].publishers[0].name);
            }
        } else {
            $publisher.hide();
            $('#p').hide();
        }
        // populates Metacritic rating and data if checked
        if ($metacriticCheckbox.prop('checked') === true) {
            if (!!gameData[0].metacritic) {
                $('#m').html('Metacritic Rating:');
                $metacritic.text(`${gameData[0].metacritic}/100`);
            }
        } else {
            $metacritic.hide();
            $('#m').hide();
        }
        // populates ESRB rating and data if checked
        if ($ratingCheckbox.prop('checked') === true) {
            if (!!gameData[0].esrb_rating.name) {
                $('#r').html('ESRB Rating:');
                $rating.text(gameData[0].esrb_rating.name);
            }
        } else {
            $rating.hide();
            $('#r').hide();
        }
        // populates release date and data if checked
        if ($releaseCheckbox.prop('checked') === true) {
            if (!!gameData[0].released) {
                $('#re').html('Release Date:');
                $releaseDate.text(gameData[0].released);
            }
        } else {
            $releaseDate.hide();
            $('#re').hide();
        }
        // populates genres and data if checked
        if ($genresCheckbox.prop('checked') === true) {
            if (gameData[0].genres.length === 1) {
                $('#g').html('Genre:');
                $genres.text(`${gameData[0].genres[0].name}`);
            } else {
                $('#g').html('Genres:');
                $genres.text(`${gameData[0].genres[0].name}, ${gameData[0].genres[1].name}`);
            }
        } else {
            $('#g').text('');
            $genres.text('');
        }
        // populates website and link data if checked
        if ($websiteCheckbox.prop('checked') === true) {
            if (!!gameData[0].website) {
                $('#w').text('Website:');
                $website.text(gameData[0].website);
                $website.attr('href', gameData[0].website);
            }
        } else {
            $('#w').text('');
            $website.text('');
        }
        // populates top of page game image 
        if (!!gameData[0].background_image) {
            $screenshot1.attr('src', gameData[0].background_image);
        }
        // populates bottom of page extra screenshot
        if (!!gameData[0].background_image_additional) {
            $screenshot2.attr('src', gameData[0].background_image_additional);
            $('#s').html('Additional Screenshot:');
        }
    }
};

// pulls data for upcoming top 5 upcoming games
$.ajax(`${UPCOMING_URL}&key=${API_KEY}`).then(data => {
    gameData = $(data);
    renderUpcoming(); 
    const gameGenres = data.results[0].genres.map(genre => genre.name);
    console.log(gameGenres);
}, error => {
    console.log('Bad upcoming games request', error);
});

const renderUpcoming = () => {
    for (i = 0; i < 2; i++) {
        $('.upcomingCardsTop').append(`<div class="upcomingCard1">
        <h2 class="name">${gameData[0].results[i].name}</h2>
        <img src="${gameData[0].results[i].background_image}" class="upcomingImage">
        <p class="re">Release Date: ${gameData[0].results[i].released}</p>
        <p class="g">Genre: ${gameData[0].results[i].genres.map((genre) => genre.name)}</p>
        </div>`);
    }
    for (i = 2; i < 5; i++) {
        $('.upcomingCardsBottom').append(`<div class="upcomingCard1">
        <h2 class="name">${gameData[0].results[i].name}</h2>
        <img src="${gameData[0].results[i].background_image}" class="upcomingImage">
        <p class="re">Release Date: ${gameData[0].results[i].released}</p>
        <p class="g">Genre: ${gameData[0].results[i].genres[0].name}</p>
        </div>`);
    }
};

