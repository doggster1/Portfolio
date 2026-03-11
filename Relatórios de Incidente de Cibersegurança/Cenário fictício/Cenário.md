# Relatório de Incidente de Cibersegurança: Análise de Tráfego de Rede

![Log do tcpdump](image_d49fd5.png)<img width="902" height="448" alt="log" src="https://github.com/user-attachments/assets/63cbff0f-e384-4536-b9fd-5eead4baf3e1" />


## Parte 1: Resumo do problema

- **O protocolo UDP revela que:** O tráfego de saída do computador solicitando a resolução do nome de domínio `yummyrecipesforme.com` para o servidor DNS falhou, pois a consulta não pôde ser entregue com sucesso.
- **Isto baseia-se nos resultados da análise de rede, que mostram que a resposta de eco ICMP devolveu a mensagem de erro:** "udp port 53 unreachable" (porta udp 53 inalcançável).
- **A porta anotada na mensagem de erro é utilizada para:** Serviços DNS (Domain Name System), que são responsáveis por traduzir nomes de domínio de sites em endereços IP.
- **O problema mais provável é:** O servidor DNS não está a executar o serviço de resolução de nomes no momento, o que significa que não há nenhum serviço a "escutar" a porta 53 para receber e processar as solicitações recebidas.

---

## Parte 2: Análise dos dados e causa do incidente

- **Hora de ocorrência do incidente:** O primeiro pacote de dados capturado regista que o incidente começou às 13:24 (exatamente às 13:24:32.192571).
- **Como a equipa de TI teve conhecimento do incidente:** Vários clientes reportaram dificuldades em aceder ao site da empresa (`www.yummyrecipesforme.com`), indicando que recebiam uma mensagem de erro de "porta de destino inalcançável" ("destination port unreachable") após aguardarem o carregamento da página.
- **Ações tomadas pelo departamento de TI para investigar o incidente:** Um analista reproduziu o erro tentando aceder ao site. Em seguida, utilizou a ferramenta de análise de rede `tcpdump` para capturar e inspecionar os pacotes de rede enquanto tentava carregar a página web novamente, com o objetivo de identificar o ponto de falha na comunicação.
- **Principais descobertas da investigação do departamento de TI:** - O navegador do utilizador (IP de origem `192.51.100.15`) enviou pacotes UDP contendo uma consulta DNS para o servidor DNS (IP de destino `203.0.113.2`).
  - O servidor DNS de destino respondeu com pacotes ICMP contendo a mensagem de erro "udp port 53 unreachable".
  - O log mostra que essa tentativa e o respetivo erro ocorreram pelo menos três vezes.
  - O protocolo de rede afetado é o DNS.
- **Causa provável do incidente:** O serviço DNS no servidor de destino (`203.0.113.2`) está inativo ou falhou (crash). Devido a isso, a porta 53 está fechada ou inacessível, impedindo o navegador de obter o endereço IP necessário para carregar o site via HTTPS. O incidente já foi encaminhado para os engenheiros de segurança para resolução.
