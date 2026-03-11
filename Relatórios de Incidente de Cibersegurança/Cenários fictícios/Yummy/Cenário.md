# Cenário do Incidente: Indisponibilidade do Site e Erro de DNS

## Visão Geral
Você atua como analista de segurança cibernética em uma empresa provedora de serviços de TI. A situação teve início quando vários clientes relataram a incapacidade de acessar o site da empresa (`www.yummyrecipesforme.com`).

* **Sintoma relatado:** Os usuários aguardam o carregamento da página e, em seguida, recebem o erro **"porta de destino inalcançável"** (*destination port unreachable*).
* **Seu objetivo:** Analisar a situação e determinar qual protocolo de rede foi afetado durante o incidente.

## Investigação Inicial e Solução de Problemas
Para iniciar a investigação, você tenta reproduzir o problema acessando o site e confirma o recebimento do mesmo erro de porta inalcançável. A partir daí, a investigação técnica avança:

1.  **Captura de Pacotes:** Você inicia a ferramenta de análise de rede **tcpdump** e tenta carregar a página da web novamente.
2.  **Comportamento Esperado:** Normalmente, para carregar a página, o navegador envia uma consulta a um servidor DNS (via protocolo UDP) para descobrir o endereço IP associado ao nome de domínio. Em seguida, usa esse IP para enviar uma solicitação HTTPS ao servidor web.
3.  **Descobertas do Analisador:** O `tcpdump` revela que, ao enviar os pacotes UDP para o servidor DNS, o seu computador recebe em troca pacotes ICMP contendo a seguinte mensagem de erro:
    > **"porta udp 53 inacessível"** (*udp port 53 unreachable*)
    > 
![Log do tcpdump](image_d49fd5.png)<img width="902" height="448" alt="log" src="https://github.com/user-attachments/assets/63cbff0f-e384-4536-b9fd-5eead4baf3e1" />

## Análise dos Registros (Logs) do tcpdump

Ao analisar o arquivo de registros gerado pelo `tcpdump`, foram identificadas as seguintes informações cruciais sobre o tráfego de rede:

### 1. Fluxo de Comunicação Inicial
* **Solicitação de Saída (Linhas 1 e 2):** Mostram a consulta inicial do seu computador para o servidor DNS solicitando a resolução do endereço IP para `yummyrecipesforme.com`. Esta solicitação é encapsulada num **pacote UDP**.
* **Resposta Recebida (Linhas 3 e 4):** Mostram a resposta ao pacote UDP inicial. A linha iniciada com `ICMP 203.0.113.2` representa o começo de uma mensagem de erro, indicando falha na entrega do pacote UDP na porta 53 do servidor DNS.

### 2. Desconstrução dos Dados do Log
* **Carimbos de Data/Hora (Timestamps):** Localizados no início de cada linha, indicam o momento exato do evento. Exemplo: `13:24:32.192571` (13 horas, 24 minutos e 32,192571 segundos).
* **Endereçamento de Rede (IPs de Origem e Destino):**
    * Na solicitação (ida): `192.51.100.15 > 203.0.113.2.domain`. O IP à esquerda do `>` é a origem (seu computador), e à direita é o destino (servidor DNS).
    * Na resposta (volta/erro ICMP): A origem passa a ser o servidor DNS (`203.0.113.2`) e o destino é o seu computador (`192.51.100.15`).
* **Detalhes e Sinalizadores (Flags):**
    * `35084+`: Número de identificação da consulta. O sinal `+` indica a presença de sinalizadores associados à mensagem UDP.
    * `A?`: Sinalizador que indica uma solicitação DNS para um "Registro A" (que mapeia um nome de domínio para um endereço IPv4).
    * `ICMP`: Protocolo da mensagem de resposta, seguido imediatamente pela descrição do erro.

### 3. Análise do Erro
* **Mensagem Crítica:** A última linha menciona especificamente **"udp port 53 unreachable"** (porta udp 53 inacessível).
* **Causa Raiz:** A porta 53 é o padrão para serviços DNS. O termo "inacessível" confirma que a solicitação para "www.yummyrecipesforme.com" não foi processada porque **nenhum serviço estava ativo/escutando** a porta receptora no servidor DNS.
* **Repetição:** As linhas subsequentes no registro confirmam que o envio dos pacotes falhou mais duas vezes, retornando exatamente o mesmo erro ICMP.

---

## Tarefa e Próximos Passos

O objetivo desta etapa de análise foi inspecionar o tráfego para identificar o protocolo e o serviço afetados durante o incidente (neste caso, o **DNS via UDP na porta 53**). 

**Status Atual do Incidente:** Enquanto a análise inicial está concluída e documentada neste relatório, a mitigação e resolução ativa do evento já foram assumidas pelos engenheiros de segurança, após o escalonamento do problema para o supervisor direto.
