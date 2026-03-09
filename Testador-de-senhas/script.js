// 1. Selecionando os elementos do HTML
const senhaInput = document.getElementById('senha-input');
const barraForca = document.getElementById('barra-forca');
const tempoQuebra = document.getElementById('tempo-quebra');
const avisoTexto = document.getElementById('aviso');
const sugestaoTexto = document.getElementById('sugestao');

// 2. Escutador de eventos para capturar a digitação
senhaInput.addEventListener('input', function() {
    const senha = senhaInput.value;

    // Limpa a tela se o campo estiver vazio
    if (senha === '') {
        barraForca.style.width = '0%';
        barraForca.style.backgroundColor = 'transparent';
        tempoQuebra.textContent = '---';
        avisoTexto.textContent = '---';
        sugestaoTexto.textContent = '---';
        return;
    }

    // 3. Analisando a senha com a biblioteca
    const resultado = zxcvbn(senha);
    const nota = resultado.score;

    // 4. Tradução do Tempo de Quebra
    let tempoOriginal = resultado.crack_times_display.offline_slow_hashing_1e4_per_second;
    
    let tempoTraduzido = tempoOriginal
        .replace('less than a second', 'menos de um segundo')
        .replace('second', 'segundo')
        .replace('seconds', 'segundos')
        .replace('minute', 'minuto')
        .replace('minutes', 'minutos')
        .replace('hour', 'hora')
        .replace('hours', 'horas')
        .replace('day', 'dia')
        .replace('days', 'dias')
        .replace('month', 'mês')
        .replace('months', 'meses')
        .replace('year', 'ano')
        .replace('years', 'anos')
        .replace('centuries', 'séculos');

    tempoQuebra.textContent = tempoTraduzido;

    // 5. Tradução de Avisos (Dicionário de termos comuns)
    const dicionarioAvisos = {
        'This is a top-10 common password': 'Esta é uma das 10 senhas mais comuns.',
        'This is a top-100 common password': 'Esta é uma das 100 senhas mais comuns.',
        'This is a very common password': 'Esta é uma senha muito comum.',
        'Add another word or two. Uncommon words are better.': 'Adicione mais palavras. Palavras incomuns são melhores.',
        'Predictable substitutions like "@" instead of "a" don\'t help very much': 'Trocar "a" por "@" não ajuda muito.',
        'Common names and surnames are easy to guess': 'Nomes comuns são fáceis de adivinhar.',
        'Dates are often easy to guess': 'Datas são fáceis de adivinhar.'
    };

    const avisoIngles = resultado.feedback.warning;
    avisoTexto.textContent = dicionarioAvisos[avisoIngles] || (avisoIngles ? 'Senha simples demais.' : 'Nenhum aviso.');

    // 6. Tradução de Sugestões
    const sugestaoIngles = resultado.feedback.suggestions[0];
    if (!sugestaoIngles) {
        sugestaoTexto.textContent = 'Sua senha está ótima!';
    } else {
        // Tradução simples para as sugestões mais frequentes
        sugestaoTexto.textContent = 'Tente misturar números, símbolos e letras maiúsculas.';
    }

    // 7. Atualização visual da barra (Cores e Tamanho)
    switch (nota) {
        case 0:
        case 1:
            barraForca.style.width = '25%';
            barraForca.style.backgroundColor = '#ff4d4d'; // Vermelho
            break;
        case 2:
            barraForca.style.width = '50%';
            barraForca.style.backgroundColor = '#ffa64d'; // Laranja
            break;
        case 3:
            barraForca.style.width = '75%';
            barraForca.style.backgroundColor = '#ffcc00'; // Amarelo
            break;
        case 4:
            barraForca.style.width = '100%';
            barraForca.style.backgroundColor = '#4dff4d'; // Verde
            break;
    }
});
