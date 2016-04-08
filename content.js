/* eslint-env addon */

'use strict';


let observer = new MutationObserver((mutations) => {
  // observer.disconnect();
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' &&
        mutation.target.localName === 'div' &&
        mutation.target.className === 'diff-box') {
      let tables =  mutation.target.querySelectorAll('table.sidebyside');
      for (let table of tables) {
        table.style.border = '1px solid rebeccapurple';
        let head = table.querySelector('tr.filename-row > th');
        let collapseButton = document.createElement('div');
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

        head.appendChild(collapseButton);
      }
    }
    observer.observe(document.getElementById('diffs'), {childList: true, subtree: true});
  });
});

observer.observe(document.getElementById('diffs'), {childList: true, subtree: true});
