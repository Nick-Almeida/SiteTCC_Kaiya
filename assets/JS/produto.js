document.querySelectorAll('.miniatura').forEach(img => {
    img.addEventListener('click', function() {
        document.getElementById('foto-grande').src = this.src;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fotoContainer = document.querySelector('.produto-foto-grande');
    const foto = document.getElementById('foto-grande');
    let zoom = 2;

    const params = new URLSearchParams(window.location.search);
    const imgSrc = params.get('img');
    const mini1 = params.get('mini1');
    const mini2 = params.get('mini2');
    const mini3 = params.get('mini3');

    if (imgSrc) {
        const fotoGrande = document.getElementById('foto-grande');
        if (fotoGrande) {
            fotoGrande.src = imgSrc;
        }
    }

    if (mini1) document.getElementById('mini1').src = mini1;
    if (mini2) document.getElementById('mini2').src = mini2;
    if (mini3) document.getElementById('mini3').src = mini3;

    fotoContainer.addEventListener('mousemove', function(e) {
        const rect = fotoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;

        foto.style.transform = `scale(${zoom})`;
        foto.style.transformOrigin = `${xPercent * 100}% ${yPercent * 100}%`;
    });

    fotoContainer.addEventListener('mouseleave', function() {
        foto.style.transform = 'scale(1)';
        foto.style.transformOrigin = 'center center';
    });

    fotoContainer.addEventListener('mouseenter', function(e) {
        foto.style.transition = 'transform 0.2s, transform-origin 0.2s';
    });

    // Counter logic
    const menos = document.getElementById('contador-menos');
    const mais = document.getElementById('contador-mais');
    const numero = document.getElementById('contador-numero');
    let valor = 1;

    if (menos && mais && numero) {
        menos.addEventListener('click', function() {
            if (valor > 1) {
                valor--;
                numero.textContent = valor;
            }
        });
        mais.addEventListener('click', function() {
            valor++;
            numero.textContent = valor;
        });
    }
});