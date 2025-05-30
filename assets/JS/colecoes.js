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

// Quando a página carrega, ativa os favoritos já salvos
window.addEventListener('DOMContentLoaded', () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.forEach(fav => {
        const favIcon = document.querySelectorAll('.fav')[fav.id - 1];
        if (favIcon) favIcon.setAttribute('data-active', 'true');
    });
});