document.querySelectorAll('.miniatura').forEach(img => {
    img.addEventListener('click', function() {
        document.getElementById('foto-grande').src = this.src;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fotoContainer = document.querySelector('.produto-foto-grande');
    const foto = document.getElementById('foto-grande');
    let zoom = 2;

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
});