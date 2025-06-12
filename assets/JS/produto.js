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
    const mini4 = params.get('mini4');
    const titulo = params.get('titulo');
    const preco = params.get('preco');

    if (imgSrc) {
        const fotoGrande = document.getElementById('foto-grande');
        if (fotoGrande) {
            fotoGrande.src = imgSrc;
        }
    }

    if (mini1) document.getElementById('mini1').src = mini1;
    if (mini2) document.getElementById('mini2').src = mini2;
    if (mini3) document.getElementById('mini3').src = mini3;
    if (mini4) document.getElementById('mini4').src = mini4;

    if (mini4) {
    document.getElementById('mini4').src = mini4;
    document.getElementById('mini4').style.display = '';
    } else {
    document.getElementById('mini4').style.display = 'none';
    }

    if (titulo) {
        document.querySelector('.produto-titulo').textContent = decodeURIComponent(titulo);
    }
    if (preco) {
        // Coloca virgula como separador decimal"
        const precoFormatado = Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.querySelector('.produto-preco').textContent = precoFormatado;
    }

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

    const descricoes = {
        "R_B": "Composição: Maxine Alfaiataria Viscose 100% Organa: Viscose 69% Linho 31%<br>Look composto por duas peças: top e shorts saia Top com manga desconstruída caída no ombro, trazendo um toque de sensualidade e charme Shorts saia arredondado com corte frontal, adicionando volume e firmeza ao look Cores: preto e vermelho, uma combinação clássica e poderosa",
        "nina-sayers": "Composição: 100% Seda indiana<br>Vestido de um ombro só com zíper lateral e abertura na cintura, drapeados na parte da saia que adicionam um toque de elegância, echarpe que acompanha o vestido, adicionando um detalhe especial e chique.",
        "odette": "Composição: Viscose 100% preto (Maxine alfaiataria)<br>Vestido midi com decote em V e manga bufante, zíper nas costas para fácil vestir e despir, acompanha body chain dourado para adicionar um toque de glamour.",
        "odile": "Composição: Maxine Alfaiataria 100%.<br>Tomara que caia com 3 cintos fixos que fazem parte da peça, fivela em dourado e babados que adicionam um toque de elegância, acompanha colar shocker para completar o look",
        "Swan": "Composição: Viscose 100%<br>Blazer elegante e sofisticado, feito em Maxine alfaiataria off white, manga mega bufante que se fixa no ombro, botões dourados. Combinação perfeita de elegância e charme",
        "Red": "Conjunto com top tomara que caia com decote em V e longo laço de 1 metro e calça pantalona com cós alto, ziper e botão, combinação perfeita de elegância e sensualidade"
    };

    // Pega o parâmetro desc da URL
    const descParam = params.get('desc');
    const descDiv = document.querySelector('.produto-detalhes-desc');
    if (descParam && descricoes[descParam] && descDiv) {
        descDiv.innerHTML = descricoes[descParam];
    }

    const miniaturas = document.querySelector('.miniaturas');
    if (miniaturas) {
        miniaturas.addEventListener('wheel', function(e) {
            const atTop = miniaturas.scrollTop === 0;
            const atBottom = miniaturas.scrollHeight - miniaturas.scrollTop === miniaturas.clientHeight;
            if (
                (e.deltaY < 0 && atTop) ||
                (e.deltaY > 0 && atBottom)
            ) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    const tamanhosParam = params.get('tamanhos');
    if (tamanhosParam) {
        const tamanhosDisponiveis = tamanhosParam.split(',').map(t => t.trim());
        document.querySelectorAll('.tamanho-btn').forEach(btn => {
            if (!tamanhosDisponiveis.includes(btn.textContent.trim())) {
                btn.style.display = 'none';
            } else {
                btn.style.display = '';
            }
        });
    }
});