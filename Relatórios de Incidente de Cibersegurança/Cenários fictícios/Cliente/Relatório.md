# Relatório de Incidente de Segurança Cibernética

## Seção 1: Identificar o tipo de ataque de rede
Com base na análise do log de tráfego de rede (capturado no Wireshark), o incidente em questão trata-se de um **Ataque de Negação de Serviço (DoS) do tipo TCP SYN Flood**.

**Análise dos padrões de tráfego:**
Inicialmente, o log demonstra o tráfego normal de rede, onde os computadores dos funcionários completam o *handshake* (aperto de mão) TCP de três vias (SYN, SYN-ACK, ACK) com o servidor web da empresa (IP 192.0.2.1) e solicitam com sucesso a página `/sales.html`. 

No entanto, o padrão muda drasticamente quando um endereço IP desconhecido (203.0.113.0) começa a enviar um volume imenso e anormal de pacotes de solicitação `[SYN]` para a porta 443 do servidor. O servidor web responde a cada solicitação com um pacote `[SYN, ACK]`, mantendo a conexão aberta e aguardando o pacote final `[ACK]` do cliente. O invasor intencionalmente não envia esse pacote final. Como o tráfego malicioso se origina de uma única fonte (um único IP), ele é classificado como um ataque DoS direto, e não um DDoS (Negação de Serviço Distribuída), que envolveria múltiplas fontes ou uma botnet.

**O motivo do erro de tempo limite:**
O site relata um erro de "Pausa na conexão" (Connection Timeout) e `504 Gateway Time-out` porque o servidor web aloca recursos na memória para cada conexão "semiaberta" iniciada pelo invasor. Como o volume de pacotes SYN maliciosos é muito maior do que os recursos do servidor podem suportar, a fila de conexões do servidor fica saturada. Consequentemente, o servidor não consegue mais aceitar ou processar o tráfego legítimo dos funcionários, causando a lentidão extrema e a queda do site.

---



## Seção 2: Análise do Impacto e Consequências

**Descrição do Ataque e Dispositivos Envolvidos:**
O ataque SYN Flood explora uma vulnerabilidade inerente ao protocolo TCP. Os principais dispositivos afetados são o servidor web da empresa e as estações de trabalho dos funcionários. O principal sintoma desse ataque é a exaustão rápida dos recursos do servidor (largura de banda, memória e capacidade de processamento de tabelas de conexão), evidenciado por uma enxurrada de tráfego de entrada em um curto período (milissegundos) e a subsequente incapacidade de responder a novos pedidos.

**Impacto na Rede e na Função do Site:**
Esse ataque afetou gravemente a rede da organização ao interromper o fluxo normal do tráfego web. A função principal do site interno — fornecer aos funcionários acesso à página de vendas e promoções (`sales.html`) — foi totalmente paralisada. As conexões legítimas foram forçadas a enviar pacotes de reset `[RST, ACK]` ou caíram por tempo limite, tornando o sistema inacessível.

**Consequências para a Organização:**
O impacto negativo direto desse ataque é a interrupção das operações de negócios. Sem acesso ao site de vendas, os funcionários ficam impedidos de pesquisar pacotes de férias, o que leva à perda de produtividade, atrasos no atendimento ao cliente, frustração da equipe e, consequentemente, potencial perda de receita para a agência de publicidade. Além disso, a equipe de TI precisou desviar seu foco para mitigar a crise e restaurar o servidor.

**Recomendações de Segurança (Mitigação):**
Para evitar que ataques semelhantes derrubem a rede no futuro, a organização deve implementar as seguintes medidas:
1. **Ativar SYN Cookies:** Configurar o servidor para utilizar SYN cookies, permitindo que ele valide a conexão antes de alocar recursos na memória, prevenindo a exaustão por conexões semiabertas.
2. **Reduzir o tempo limite de conexões SYN (Timeout):** Ajustar as configurações do servidor para que ele descarte conexões semiabertas mais rapidamente caso não receba o pacote ACK.
3. **Limitação de Taxa (Rate Limiting) e IPS/IDS:** Configurar o firewall ou um Sistema de Prevenção de Intrusão (IPS) para limitar o número de solicitações SYN que um único IP pode enviar por segundo, bloqueando automaticamente fontes de tráfego anômalas.
