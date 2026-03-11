# Relatório de Incidente de Cibersegurança: Análise de Tráfego de Rede

## Parte 1: Resumo do problema encontrado no registo do tcpdump

Como parte do protocolo DNS, o protocolo UDP foi utilizado para contactar o servidor DNS com o objetivo de recuperar o endereço IP para o nome de domínio `yummyrecipesforme.com`. O protocolo ICMP foi utilizado para responder com uma mensagem de erro, indicando problemas no contacto com o servidor DNS. A mensagem UDP enviada do seu navegador para o servidor DNS é mostrada nas duas primeiras linhas de cada evento de registo (*log*). A resposta de erro ICMP do servidor DNS para o seu navegador é apresentada na terceira e quarta linhas de cada evento de registo com a mensagem de erro *"udp port 53 unreachable"* (porta udp 53 inalcançável). 

Uma vez que a porta 53 está associada ao tráfego do protocolo DNS, sabemos que se trata de um problema com o servidor DNS. Os problemas na execução do protocolo DNS tornam-se ainda mais evidentes porque o sinal de mais após o número de identificação da consulta `35084` indica *flags* com a mensagem UDP, e o símbolo `"A?"` indica *flags* relacionadas com a execução de operações do protocolo DNS. Devido à mensagem de resposta de erro ICMP sobre a porta 53, é altamente provável que o servidor DNS não esteja a responder. Esta suposição é ainda mais suportada pelas *flags* associadas à mensagem UDP de saída e à recuperação do nome de domínio.

---

## Parte 2: Análise dos dados e causa do incidente

O incidente ocorreu hoje às 13:24. Os clientes notificaram a organização de que receberam a mensagem *"destination port unreachable"* (porta de destino inalcançável) quando tentaram visitar o site `yummyrecipesforme.com`. A equipa de cibersegurança que fornece serviços de TI à organização cliente está atualmente a investigar o problema para que os clientes possam voltar a aceder ao site. 

Na nossa investigação do problema, realizámos testes de interceção de pacotes (*packet sniffing*) utilizando a ferramenta `tcpdump`. No ficheiro de registo resultante, descobrimos que a porta DNS 53 estava inalcançável. O próximo passo é identificar se o servidor DNS está inativo (*down*) ou se o tráfego para a porta 53 está a ser bloqueado pela *firewall*. O servidor DNS pode estar inativo devido a um ataque de Negação de Serviço (DoS) bem-sucedido ou a um erro de configuração.
