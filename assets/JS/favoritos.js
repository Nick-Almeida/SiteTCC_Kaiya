function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grid = document.getElementById('grid-pricipal');
    grid.innerHTML = '<h2 class="titulo" style="grid-column: 1 / -1;">Meus favoritos</h2>';
    if (favorites.length === 0) {
        grid.innerHTML += '<p style="grid-column:1/-1;text-align:center;">Nenhum favorito.</p>';
    } else {
        favorites.forEach((item) => {
            grid.innerHTML += `
                <div class="favorite-card" data-id="${item.id}">
                    <span class="fav fav-remove" data-id="${item.id}" data-active="true"></span>
                    <img src="${item.img}" alt="Favorito">
                    <div class="img-desc">${item.desc}</div>
                    <div class="img-preco">${item.preco}</div>
                </div>
            `;
        });
    }

    // Adiciona event listeners para remover favoritos
    document.querySelectorAll('.fav-remove').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            favorites = favorites.filter(item => item.id != id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
        });
    });
}

window.addEventListener('DOMContentLoaded', renderFavorites);
window.addEventListener('storage', function(e) {
    if (e.key === 'favorites') renderFavorites();
});