import FavoriteMovieIdb from '../idb-favourite';
import {createMovieItemTemplate} from '../template-creator';

const Like = {
    async render() {
        return `
      <div class="content">
        <h2 class="content__heading">Your Liked Movie</h2>
        <div id="movies" class="movies">
 
        </div>
      </div>
    `;
    },

    async afterRender() {
        const movies = await FavoriteMovieIdb.getAll();
        const moviesContainer = document.querySelector('#movies');
        if (movies.length > 0)
            movies.forEach((movie) => {
                moviesContainer.innerHTML += createMovieItemTemplate(movie);
            });
        else moviesContainer.innerHTML = '<div class="movie-item__empty">Empty!</div>';
    },
};

export default Like;
