document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('footer-input');
    const btn = document.getElementById('footer-btn');
    const popup = document.getElementById('newsletter-popup');

    function mostrarPopup() {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000); // O popup desaparece após 3 segundos
    }
    
    function validarELimpar(e) {
        e.preventDefault();
        if (input.value.trim() !== '') {
            mostrarPopup();
            input.value = '';
        }
    }

    btn.addEventListener('click', validarELimpar);

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            limparInput(e);
        }
    });
});