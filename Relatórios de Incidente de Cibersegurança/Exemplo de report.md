# Exemplo de um Relatório de Incidente de Cibersegurança

> **Nota:** Este exemplo de relatório refere-se a um evento de segurança diferente do cenário apresentado na atividade. Este exemplo deve ser utilizado apenas para sua familiarização com o formato esperado do relatório.

## Parte 1: Resumo do problema encontrado no registo de tráfego DNS e ICMP

Os registos do analisador de protocolo de rede indicam que a porta 443 está inalcançável ao tentar aceder ao site seguro de verificação de antecedentes dos funcionários. 

* A porta 443 é normalmente utilizada para tráfego **HTTPS**. 
* Isto pode indicar um problema com o servidor web ou com a configuração da firewall. 
* É possível que isto seja uma indicação de um ataque malicioso direcionado ao servidor web.

---

## Parte 2: Análise dos dados e causa do incidente

* **Contexto do Incidente:** O incidente ocorreu esta manhã, quando a equipa de recursos humanos (RH) comunicou que não conseguia aceder ao portal web de verificação de antecedentes. 
* **Ação Inicial:** A equipa de segurança de rede respondeu e começou a executar testes com a ferramenta de análise de protocolo de rede `tcpdump`. 
* **Descobertas:** Os registos resultantes revelaram que a porta 443 (utilizada para tráfego HTTPS) não está acessível. 
* **Próximos Passos (Investigação da Causa Raiz):**
  1. Verificar a configuração da firewall para determinar se a porta 443 está a ser bloqueada.
  2. Contactar o administrador de sistemas do servidor web para que verifique se o sistema apresenta sinais de ataque.
* **Causa Provável/Suspeita:** A equipa de RH acredita ser possível que um determinado novo funcionário queira impedi-los de realizar a sua verificação de antecedentes. A equipa de segurança de rede suspeita que esta pessoa possa ter lançado um ataque para deitar abaixo (crash) o site de verificação de antecedentes.
