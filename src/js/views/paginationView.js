// Imports
import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // Page 1, there are other pages
    return this._generateMarkupButton(curPage, numPages);
  }
  _generateMarkupButton(curPage, numPages) {
    const prevButton = `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
      </button>
    `;
    const nextButton = `
      <button class="btn--inline pagination__btn--next"  data-goto="${
        curPage + 1
      }">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
    `;
    if (curPage === 1 && numPages > 1) {
      return nextButton;
    }
    // Page 1, there are no other pages
    else if (curPage === 1 && numPages === 1) {
      return '';
    }
    // Last Page
    else if (curPage === numPages && numPages > 1) {
      return prevButton;
    }
    // Middle Page
    else if (curPage < numPages) {
      return [prevButton, nextButton].join('');
    }
  }
}

export default new PaginationView();
