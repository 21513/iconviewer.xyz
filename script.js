fetch('icons.json')
  .then(response => response.json())
  .then(svgFiles => {
    const container = document.querySelector('body');

    const search = document.createElement('search');
    search.classList.add('search');

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search icons...';
    searchBar.classList.add('searchbar');
    search.appendChild(searchBar);
    container.appendChild(search);

    const page = document.createElement('div');
    page.classList.add('page');
    container.appendChild(page);

    function displayIcons(files) {
      page.innerHTML = '';
      files.forEach(file => {
        const group = document.createElement('div');
        group.classList.add('group');

        const iconEmpty = document.createElement('div');
        iconEmpty.classList.add('icon_empty');

        const imgIcon = document.createElement('img');
        imgIcon.classList.add('icon');
        imgIcon.src = `icons/${file}`;
        iconEmpty.appendChild(imgIcon);

        const copyDiv = document.createElement('div');
        copyDiv.classList.add('copy');

        const clipboardIcon = document.createElement('img');
        clipboardIcon.classList.add('clipboard');
        clipboardIcon.src = 'assets/copy.svg';

        const textLink = document.createElement('a');
        textLink.classList.add('text');
        const filename = file.split('/').pop().replace('.svg', '');
        textLink.textContent = filename;

        copyDiv.onclick = () => {
          copyText(filename);
          copyAlert(copyDiv);
        };

        copyDiv.appendChild(clipboardIcon);
        copyDiv.appendChild(textLink);

        group.appendChild(iconEmpty);
        group.appendChild(copyDiv);

        page.appendChild(group);
      });
    }

    displayIcons(svgFiles);

    searchBar.addEventListener('input', () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredIcons = svgFiles.filter(file =>
        file.toLowerCase().includes(searchTerm)
      );
      displayIcons(filteredIcons);
    });
  })
  .catch(error => console.error('Error fetching SVG list:', error));

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function copyAlert(element) {
  const alert = document.querySelector('.alert');
  alert.classList.add('active');
  setTimeout(() => {
    alert.classList.remove('active');
  }, 2000);
}

function downloadZip() {
  const link = document.createElement('a');
  link.href = 'download/blender-icons.zip';
  link.download = 'blender-icons-svg.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
