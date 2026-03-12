# Como ler o log de tráfego do tcpdump

Esta leitura explica como usar o `tcpdump` para analisar o tráfego de rede relacionado com o incidente de segurança.

```text
14:18:32.192571 IP your.machine.52444 > dns.google.domain: 35084+ A? yummyrecipesforme.com. (24)
14:18:32.204388 IP dns.google.domain > your.machine.52444: 35084 1/0/0 A 203.0.113.22 (40)
A primeira secção do ficheiro de log de tráfego DNS e HTTP mostra o computador de origem (your.machine.52444) a usar a porta 52444 para enviar um pedido de resolução DNS para o servidor DNS (dns.google.domain) referente ao URL de destino (yummyrecipesforme.com). Em seguida, a resposta volta do servidor DNS para o computador de origem com o endereço IP do URL de destino (203.0.113.22).

Plaintext

14:18:36.786501 IP your.machine.36086 > yummyrecipesforme.com.http: Flags [S], seq 2873951608, win 65495, options [mss 65495,sackOK,TS val 3302576859 ecr 0,nop,wscale 7], length 0
14:18:36.786517 IP yummyrecipesforme.com.http > your.machine.36086: Flags [S.], seq 3984334959, ack 2873951609, win 65483, options [mss 65495,sackOK,TS val 3302576859 ecr 3302576859,nop,wscale 7], length 0
A secção seguinte mostra o computador de origem a enviar um pedido de ligação (Flags [S]) a partir do computador de origem (your.machine.36086) utilizando a porta 36086 diretamente para o destino (yummyrecipesforme.com.http). O sufixo .http é o número da porta; o http está normalmente associado à porta 80. A resposta mostra o destino a confirmar que recebeu o pedido de ligação (Flags [S.]). A comunicação entre a origem e o destino pretendido continua durante cerca de 2 minutos, de acordo com os carimbos de data/hora (timestamps) entre este bloco (14:18) e o próximo pedido de resolução DNS (ver abaixo o timestamp das 14:20).

Os códigos de Flag TCP incluem:

Flags [S] - Início de Ligação (Connection Start / SYN)

Flags [F] - Fim de Ligação (Connection Finish / FIN)

Flags [P] - Envio de Dados (Data Push / PSH)

Flags [R] - Reposição de Ligação (Connection Reset / RST)

Flags [.] - Confirmação (Acknowledgment / ACK)

Plaintext

14:18:36.786589 IP your.machine.36086 > yummyrecipesforme.com.http: Flags [P.], seq 1:74, ack 1, win 512, options [nop,nop,TS val 3302576859 ecr 3302576859], length 73: HTTP: GET / HTTP/1.1
A entrada de log com o código HTTP: GET / HTTP/1.1 mostra que o navegador (browser) está a solicitar dados de yummyrecipesforme.com através do método HTTP: GET utilizando a versão 1.1 do protocolo HTTP. Este poderá ser o pedido de transferência (download) do ficheiro malicioso.

Plaintext

14:20:32.192571 IP your.machine.52444 > dns.google.domain: 21899+ A? greatrecipesforme.com. (24)
14:20:32.204388 IP dns.google.domain > your.machine.52444: 21899 1/0/0 A 192.0.2.172 (40)
14:25:29.576493 IP your.machine.56378 > greatrecipesforme.com.http: Flags [S], seq 1020702883, win 65495, options [mss 65495,sackOK,TS val 3302989649 ecr 0,nop,wscale 7], length 0
14:25:29.576510 IP greatrecipesforme.com.http > your.machine.56378: Flags [S.], seq 1993648018, ack 1020702884, win 65483, options [mss 65495,sackOK,TS val 3302989649 ecr 3302989649,nop,wscale 7], length 0
Em seguida, ocorre uma mudança repentina nos logs. O tráfego é novamente reencaminhado do computador de origem para o servidor DNS utilizando a porta .52444 (your.machine.52444 > dns.google.domain) para efetuar outro pedido de resolução DNS. Desta vez, o servidor DNS encaminha o tráfego para um novo endereço IP (192.0.2.172) e para o seu URL associado (greatrecipesforme.com.http). O tráfego muda para uma rota entre o computador de origem e o site falsificado/malicioso (tráfego de saída: IP your.machine.56378 > greatrecipesforme.com.http e tráfego de entrada: greatrecipesforme.com.http > IP your.machine.56378). Repare que o número da porta (.56378) no computador de origem mudou mais uma vez ao ser redirecionado para um novo site.

Recursos para mais informações
Uma introdução ao uso do tcpdump na linha de comandos Linux: Lista vários comandos tcpdump com exemplos de resultados. O artigo descreve os dados nos resultados e explica por que razão são úteis.

Folha de Referência (Cheat Sheet) do tcpdump: Lista comandos tcpdump, opções de captura de pacotes, opções de saída, códigos de protocolo e opções de filtros.

O que é uma porta de computador? | Portas em redes: Fornece uma pequena lista das portas mais comuns para tráfego de rede e os seus protocolos associados. O artigo também fornece informações sobre portas em geral e sobre a utilização de firewalls para bloquear portas.

Registo de Números de Porta de Protocolo de Transporte e Nomes de Serviço: Fornece uma base de dados de números de porta com os respetivos nomes de serviço, protocolos de transporte e descrições.

Como Capturar e Analisar Tráfego de Rede com o tcpdump?: Fornece vários comandos tcpdump com exemplos de resultados. Em seguida, o artigo descreve cada elemento de dados nos exemplos de resultados do tcpdump.

Masterclass – Tcpdump – Interpretação de Resultados: Fornece um guia de referência com códigos de cores para os resultados do tcpdump.
