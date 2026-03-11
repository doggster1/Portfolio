# Relatório de Incidente de Cibersegurança: Análise de Tráfego de Rede

## Parte 1: Resumo do problema encontrado no registro de tráfego DNS e ICMP

Os logs do analisador de protocolo de rede (`tcpdump`) indicam que o tráfego não está conseguindo alcançar o serviço de resolução de nomes (DNS). A análise revela a seguinte tendência nos dados:

* **O protocolo UDP revela que:** As consultas enviadas pelo navegador (via pacotes UDP) para descobrir o endereço IP do site `www.yummyrecipesforme.com` não estão sendo entregues com sucesso ao servidor de destino.
* **Isto baseia-se nos resultados da análise de rede, que mostram que a resposta ICMP devolveu a mensagem de erro:** `"udp port 53 unreachable"` (porta udp 53 inalcançável).
* **A porta anotada na mensagem de erro é utilizada para:** O serviço DNS (Domain Name System), que traduz nomes de domínio em endereços IP.
* **O problema mais provável é:** O servidor DNS (`203.0.113.2`) está online (pois responde com pacotes ICMP), mas o serviço DNS em si não está em execução ou falhou. Como não há nenhum serviço "escutando" a porta 53, os pacotes UDP são rejeitados.

---

## Parte 2: Análise dos dados e causa do incidente

* **Hora de ocorrência do incidente:** O problema foi registrado pela primeira vez nos logs às **13:24:32** (com base no carimbo de data/hora `13:24:32.192571` da captura inicial).
* **Como a equipe de TI teve conhecimento do incidente:** Vários clientes relataram que não conseguiam acessar o site da empresa (`www.yummyrecipesforme.com`). O sintoma relatado foi que, após aguardar o carregamento da página, o navegador exibia o erro "porta de destino inalcançável".
* **Ações tomadas pelo departamento de TI para investigar o incidente:** 1. A equipe tentou acessar o site para confirmar o erro.
  2. A ferramenta de análise de rede `tcpdump` foi executada para capturar o tráfego de rede e identificar o ponto de falha na comunicação enquanto uma nova tentativa de carregar a página era feita.
* **Principais descobertas da investigação do departamento de TI:**
  * O endereço IP de origem (`192.51.100.15` - máquina local) tentou enviar várias consultas de registro DNS tipo "A" para o IP de destino (`203.0.113.2` - servidor DNS).
  * O servidor de destino respondeu repetidamente com pacotes ICMP contendo o erro de porta 53 inalcançável. 
  * Isso confirma que o erro não está no servidor web em si, mas na etapa anterior: a resolução do domínio. Sem o IP do site, o navegador sequer consegue iniciar a solicitação HTTPS.
* **Status atual e próximas etapas:** * **Status:** O incidente foi analisado, confirmado e repassado aos engenheiros de segurança para tratamento.
  * **Próximas etapas:** A equipe de engenharia deve verificar o status do servidor DNS (`203.0.113.2`), reiniciar o serviço (daemon) DNS se ele tiver travado, e investigar os logs do próprio servidor DNS para descobrir o que causou a queda do serviço (ex: sobrecarga, falha de configuração ou ataque).
* **Causa provável do incidente:** A causa raiz suspeita é uma falha ou interrupção do serviço DNS no servidor designado. Como a porta 53 não está aceitando conexões, os clientes não conseguem resolver o domínio `yummyrecipesforme.com` para um endereço IP, o que impede totalmente o acesso ao site.
