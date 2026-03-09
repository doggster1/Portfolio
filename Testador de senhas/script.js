// 1. Selecionando os elementos do HTML que vamos interagir
const senhaInput = document.getElementById('senha-input');
const barraForca = document.getElementById('barra-forca');
const tempoQuebra = document.getElementById('tempo-quebra');
const avisoTexto = document.getElementById('aviso');
const sugestaoTexto = document.getElementById('sugestao');

// 2. Criando um "escutador" que roda toda vez que o usuário digita algo
senhaInput.addEventListener('input', function() {
    const senha = senhaInput.value;

    // Se o campo estiver vazio, limpamos a tela e paramos por aqui
    if (senha === '') {
        barraForca.style.width = '0%';
        barraForca.style.backgroundColor = 'transparent';
        tempoQuebra.textContent = '---';
        avisoTexto.textContent = '---';
        sugestaoTexto.textContent = '---';
        return;
    }

    // 3. A Mágica! A biblioteca zxcvbn analisa a senha digitada
    const resultado = zxcvbn(senha);

    // O resultado.score é uma nota de 0 a 4 que a biblioteca dá para a senha
    const nota = resultado.score;

    // 4. Atualizando os textos de feedback na tela
    // O zxcvbn já calcula o tempo e devolve em texto (ex: "less than a second", "centuries")
    tempoQuebra.textContent = resultado.crack_times_display.offline_slow_hashing_1e4_per_second;

    // Colocamos os avisos e dicas (se não tiver nenhum, mostramos uma mensagem padrão)
    avisoTexto.textContent = resultado.feedback.warning || 'Nenhum aviso.';
    sugestaoTexto.textContent = resultado.feedback.suggestions[0] || 'Sua senha está ótima!';

    // 5. Mudando a cor e o tamanho da barrinha com base na nota
    switch (nota) {
        case 0:
        case 1:
            barraForca.style.width = '25%';
            barraForca.style.backgroundColor = '#ff4d4d'; // Vermelho (Fraca)
            break;
        case 2:
            barraForca.style.width = '50%';
            barraForca.style.backgroundColor = '#ffa64d'; // Laranja (Razoável)
            break;
        case 3:
            barraForca.style.width = '75%';
            barraForca.style.backgroundColor = '#ffcc00'; // Amarelo (Boa)
            break;
        case 4:
            barraForca.style.width = '100%';
            barraForca.style.backgroundColor = '#4dff4d'; // Verde (Forte)
            break;
    }
});
