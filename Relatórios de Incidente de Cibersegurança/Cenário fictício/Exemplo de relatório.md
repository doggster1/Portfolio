# Gabarito Explicado: Relatório de Incidente de Cibersegurança (Análise de Tráfego)

Este documento detalha o exemplo ideal para o relatório de incidente, desconstruindo cada secção e explicando os requisitos que a originaram.

---

## Parte 1: Resumo do problema encontrado no registo de tráfego DNS e ICMP

### Secção A
* **Exemplo de Resposta no Relatório:** Como parte do protocolo DNS, o protocolo UDP foi utilizado para contactar o servidor DNS de forma a recuperar o endereço IP para o nome de domínio de `yummyrecipesforme.com`. O protocolo ICMP foi utilizado para responder com uma mensagem de erro, indicando problemas no contacto com o servidor DNS.
* **Explicação do Gabarito:** *Inclua um breve resumo da análise do registo tcpdump e identifique quais os protocolos utilizados para o tráfego de rede.* O cenário resume o problema e identifica os protocolos. O cenário afirma que o navegador envia primeiro uma consulta (UDP) para o servidor DNS e que o analisador mostra a receção de pacotes ICMP com o erro "udp port 53 unreachable".

### Secção B
* **Exemplo de Resposta no Relatório:** A mensagem UDP que vai do seu navegador para o servidor DNS é mostrada nas duas primeiras linhas de cada evento do registo. A resposta de erro ICMP do servidor DNS para o seu navegador é apresentada na terceira e quarta linhas com a mensagem "udp port 53 unreachable". Como a porta 53 está associada ao tráfego do protocolo DNS, sabemos que se trata de um problema com o servidor DNS. Problemas na execução do protocolo DNS tornam-se ainda mais evidentes porque o sinal de mais após o número de identificação da consulta (35084) indica *flags* com a mensagem UDP, e o símbolo "A?" indica *flags* relacionadas com operações do protocolo DNS.
* **Explicação do Gabarito:** *Forneça alguns detalhes sobre o que foi indicado no registo.* O cenário menciona que a análise gravou pacotes UDP do computador de origem para o IP/porta do servidor DNS e gravou as respostas de erro ICMP ("udp port 53 unreachable"). Também explica que a porta 53 é o serviço DNS e detalha o significado do sinal de mais e da *flag* "A?" (pedido de um registo A, que mapeia um domínio para um IP).

### Secção C
* **Exemplo de Resposta no Relatório:** Devido à mensagem de resposta de erro ICMP sobre a porta 53, é altamente provável que o servidor DNS não esteja a responder. Esta suposição é ainda mais suportada pelas *flags* associadas à mensagem UDP de saída e à recuperação do nome de domínio.
* **Explicação do Gabarito:** *Interprete os problemas encontrados no registo.* Uma pesquisa rápida por "porta 53" mostra que esta é comummente utilizada para comunicações DNS. Como a porta 53 está inalcançável, pode-se concluir que o servidor DNS também está inalcançável ou "não está a responder". Isto poderia ser causado, por exemplo, por um ataque DoS (Denial of Service) contra o servidor DNS.

---

## Parte 2: Análise dos dados e causa do incidente

### Secção D
* **Exemplo de Resposta no Relatório:** O incidente ocorreu hoje às 13:24.
* **Explicação do Gabarito:** *Informe quando o problema foi relatado pela primeira vez.* Esta informação foi obtida a partir da data e hora do ficheiro de registo. A primeira sequência de números é `13:24:32.192571`, indicando 13:24 (formato de 24 horas).

### Secção E
* **Exemplo de Resposta no Relatório:** Os clientes notificaram a organização de que receberam a mensagem "destination port unreachable" (porta de destino inalcançável) quando tentaram visitar o site `yummyrecipesforme.com`.
* **Explicação do Gabarito:** *Forneça o cenário, os eventos e os sintomas identificados.* O cenário refere que um grupo de clientes contactou a empresa para relatar que não conseguia aceder ao site, deparando-se com esse erro após aguardar o carregamento da página.

### Secção F
* **Exemplo de Resposta no Relatório:** A equipa de cibersegurança que fornece serviços de TI à organização cliente está atualmente a investigar o problema para que os clientes possam voltar a aceder ao site.
* **Explicação do Gabarito:** *Explique o status atual do problema.* O cenário indica que o incidente está a ser tratado por engenheiros de segurança após ter sido reportado aos supervisores.

### Secção G
* **Exemplo de Resposta no Relatório:** Na nossa investigação ao problema, realizámos testes de interceção de pacotes (*packet sniffing*) utilizando o `tcpdump`. No ficheiro de registo resultante, descobrimos que a porta DNS 53 estava inalcançável.
* **Explicação do Gabarito:** *Descreva as informações descobertas durante a investigação até ao momento.* Fornece um resumo conciso do que foi feito. O cenário menciona a tentativa de visitar o site (recebendo o erro) e a utilização do `tcpdump`, que resultou na captura de pacotes UDP enviados e pacotes ICMP recebidos com a mensagem "udp port 53 unreachable".

### Secção H
* **Exemplo de Resposta no Relatório:** O próximo passo é identificar se o servidor DNS está inativo (*down*) ou se o tráfego para a porta 53 está a ser bloqueado pela firewall.
* **Explicação do Gabarito:** *Liste as próximas etapas de resolução do problema.* O próximo passo é determinar se o servidor DNS está a funcionar corretamente. Se estiver bem, a equipa deve verificar as configurações da firewall para ver se alguém bloqueou o tráfego na porta 53 (bloqueios de portas podem ser usados para parar ou prevenir ataques, mas podem causar interrupções legítimas).

### Secção I
* **Exemplo de Resposta no Relatório:** O servidor DNS pode estar inativo devido a um ataque bem-sucedido de Negação de Serviço (DoS) ou a um erro de configuração.
* **Explicação do Gabarito:** *Forneça a suspeita da causa raiz do problema.* O objetivo de um ataque DoS é enviar uma inundação de informações para um dispositivo de rede (como um servidor DNS) para o deitar abaixo ou impedi-lo de responder ao tráfego legítimo. É possível que um atacante tenha desativado o servidor com um ataque DoS. Alternativamente, alguém da equipa pode ter feito uma alteração na configuração da firewall que bloqueou a porta 53 acidentalmente.
