function updateFavIcons() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.fav').forEach((icon, idx) => {
        const id = (icon.closest('.grid-img')?.getAttribute('data-id')) || (idx + 1).toString();
        const isFav = favorites.some(item => item.id == id);
        icon.setAttribute('data-active', isFav ? 'true' : 'false');
    });
}

document.querySelectorAll('.fav').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        const gridImg = this.closest('.grid-img');
        const id = Array.from(document.querySelectorAll('.grid-img')).indexOf(gridImg) + 1;
        const img = gridImg.querySelector('img').getAttribute('src');
        const desc = document.querySelector(`#info${id} .img-desc`).innerText;
        const preco = document.querySelector(`#info${id} .img-preco`).innerText;

        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const exists = favorites.find(item => item.id == id);

        if (this.getAttribute('data-active') === 'true') {
            // Remove dos favoritos
            favorites = favorites.filter(item => item.id != id);
            this.setAttribute('data-active', 'false');
        } else {
            // Adiciona aos favoritos
            favorites.push({ id, img, desc, preco });
            this.setAttribute('data-active', 'true');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});

// Quando a página carrega, marca itens já favoritados
window.addEventListener('DOMContentLoaded', updateFavIcons);

// "Ouve" por mudanças em outras páginas, se baseando no localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'favorites') {
        updateFavIcons();
    }
});