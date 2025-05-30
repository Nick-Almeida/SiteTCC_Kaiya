function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grid = document.getElementById('grid-pricipal');
    
    // Remove tudo menos o título
    grid.innerHTML = '<h2 class="titulo">Favoritos</h2>';
    if (favorites.length === 0) {
        grid.innerHTML += '<p style="grid-column:1/-1;text-align:center;">Nenhum favorito.</p>';
    } else {
        favorites.forEach((item, idx) => {
            grid.innerHTML += `
                <a href="#" class="grid-img img${idx+1}">
                    <img src="${item.img}" alt="Favorito ${idx+1}">
                    <div class="grid-img-barra"></div>
                </a>
                <div id="info${idx+1}">
                    <div class="img-desc">${item.desc}</div>
                    <div class="img-preco">${item.preco}</div>
                </div>
            `;
        });
    }
}

window.addEventListener('DOMContentLoaded', renderFavorites);

// Atualiza a página quando o localStorage é modificado
window.addEventListener('storage', function(e) {
    if (e.key === 'favorites') {
        renderFavorites();
    }
});