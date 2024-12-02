const assert = require('assert');

Feature('Liking Movies');

Before(({I}) => {
    I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', ({I}) => {
    I.seeElement('#movies');
    I.see('Empty!', '.movie-item__empty');
});

Scenario('liking one movie', async ({I}) => {
    // pick one
    I.amOnPage('/');
    I.seeElement('.movie-item__content h3 a');
    const firstMovie = locate('.movie-item__content h3 a').first();
    const firstMovieTitle = await I.grabTextFrom(firstMovie);
    I.click(firstMovie);

    // like it
    I.seeElement('#likeButton');
    I.click('#likeButton');

    // pause();

    // check it
    I.amOnPage('/#/like');
    I.seeElement('#movies');
    const likedMovieTitle = await I.grabTextFrom('.movie-item__content h3 a');

    assert.strictEqual(firstMovieTitle, likedMovieTitle);
});

Scenario('unliking one movie', async ({ I }) => {
    // pick one
    I.amOnPage('/');
    I.seeElement('.movie-item__content h3 a');
    I.click(locate('.movie-item__content h3 a').first());

    // like it
    I.seeElement('[aria-label="like this movie"]');
    I.click('#likeButton');

    // check it
    I.amOnPage('/#/like');
    I.seeElement('#movies');

    // pause();

    // pick it again
    I.click(locate('.movie-item__content h3 a').first());

    // unlike it
    I.seeElement('[aria-label="unlike this movie"]');
    I.click('#likeButton');

    // ensure empty
    I.amOnPage('/#/like');
    I.seeElement('#movies');
    I.see('Empty!', '.movie-item__empty');
});
