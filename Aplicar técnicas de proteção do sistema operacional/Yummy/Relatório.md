# Relatório de Incidente de Segurança

## Secção 1: Identificar o protocolo de rede envolvido no incidente
**Protocolos Identificados:** HTTP (Hypertext Transfer Protocol), DNS (Domain Name System) e TCP/IP. 
*Nota:* O protocolo HTTP (Camada de Aplicação do modelo TCP/IP) foi o principal veículo utilizado para os pedidos de transferência de dados (`HTTP GET`) durante o incidente.

## Secção 2: Documentar o incidente
**Descrição e Resumo dos Eventos:**
Com base na análise do ficheiro de captura de tráfego de rede (`tcpdump`), o incidente de segurança desenrolou-se da seguinte forma:

* **14:18:32:** A máquina de origem (`your.machine.52444`) enviou um pedido de resolução DNS para o servidor da Google com o objetivo de aceder ao domínio `yummyrecipesforme.com`, sendo-lhe devolvido o endereço IP `203.0.113.22`.
* **14:18:36:** A máquina de origem estabeleceu uma ligação TCP (handshake SYN, SYN-ACK, ACK) com o IP de destino na porta 80. Imediatamente a seguir, foi efetuado um pedido `HTTP: GET / HTTP/1.1`. Este evento indica que o navegador da máquina local solicitou dados do servidor, sendo o momento provável em que ocorreu a transferência de um ficheiro malicioso.
* **14:20:32:** Cerca de dois minutos depois, a máquina de origem iniciou um novo pedido DNS para um domínio diferente: `greatrecipesforme.com`, resolvido para o IP `192.0.2.17`.
* **14:25:29:** A máquina estabeleceu uma nova ligação TCP via HTTP para este segundo domínio (suspeito de ser um site falsificado ou infraestrutura maliciosa) e enviou um novo pedido `HTTP: GET`. 

**Fonte de Informação/Evidências:** Ficheiro de log de tráfego de rede gerado pelo utilitário `tcpdump`.

## Secção 3: Recomendar uma remediação para ataques de força bruta
Para garantir uma defesa robusta, recomendo a implementação das seguintes medidas de segurança complementares:

**1. Impor a Autenticação de Dois Fatores (2FA)**
* **Justificação da Eficácia:** A implementação do 2FA exige que o utilizador forneça duas formas diferentes de identificação (por exemplo, a palavra-passe e um código gerado no telemóvel). É extremamente eficaz contra ataques de força bruta porque, mesmo que o atacante consiga adivinhar a palavra-passe através de tentativas exaustivas, continuará a não conseguir aceder à conta sem o segundo fator de autenticação, bloqueando o acesso não autorizado.

**2. Limitar o número de tentativas de login (Account Lockout)**
* **Justificação da Eficácia:** Implementar uma política que limite as tentativas de login (por exemplo, bloquear a conta temporariamente após 3 a 5 tentativas falhadas consecutivas) quebra a mecânica principal do ataque. Os ataques de força bruta dependem de testar milhares de combinações num curto espaço de tempo. Ao bloquear a conta ou introduzir um atraso progressivo, interrompe-se a automação do atacante, tornando a quebra da palavra-passe inviável.
