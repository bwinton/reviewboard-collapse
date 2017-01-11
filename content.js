/* eslint-env addon */

'use strict';

const kButtonClass = 'reviewboard-collapse-add-on-collapse-button';
const kButtonSelector = 'div.' + kButtonClass;

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' &&
        mutation.target.matches && mutation.target.matches('div.diff-box') &&
        // Avoid re-entering for our own button!
        !Array.from(mutation.addedNodes).some(node => node.matches && node.matches(kButtonSelector))) {
      let table =  mutation.target.querySelector('table.sidebyside');
      table.style.border = '1px solid rebeccapurple';
      let collapseButton = mutation.target.querySelector(kButtonSelector);
      if (!collapseButton) {
        collapseButton = document.createElement('div');
        collapseButton.className = kButtonClass;
        collapseButton.textContent = 'Collapse';
        collapseButton.style.backgroundColor = '#a4a4a4';
        collapseButton.style.border = '1px solid #333';
        collapseButton.style.borderRadius = '3px';
        collapseButton.style.color = '#fff';
        collapseButton.style.cursor = 'pointer';
        collapseButton.style.MozUserSelect = 'none';
        collapseButton.style.padding = '3px';
        collapseButton.style.position = 'absolute';
        collapseButton.style.right = '10px';
        collapseButton.style.top = '10px';
        collapseButton.addEventListener('click', () => {
          let bodies = document.getElementById(table.id).querySelectorAll('tbody');
          for (let body of bodies) {
            body.classList.toggle('CodeMirror-vscrollbar');
          }
        });
        mutation.target.appendChild(collapseButton);
      }

      let toggleReviewStatusButton =
        Array.from(mutation.addedNodes).find(node => node.matches && node.matches('button.diff-file-btn'));
      if (toggleReviewStatusButton) {
        collapseButton.style.right = (20 + toggleReviewStatusButton.getBoundingClientRect().width) + "px";
      }
    }
  });
});

let diffsDiv = document.getElementById('diffs');
if (diffsDiv) {
  observer.observe(diffsDiv, {childList: true, subtree: true});
}
