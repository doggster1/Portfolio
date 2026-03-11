# Exemplo de Atividade: Analisar ataques de rede

## Seção 1: Identificar o tipo de ataque que pode ter causado essa interrupção de rede

Uma possível explicação para a mensagem de erro de tempo limite de conexão (*connection timeout*) do site é um ataque **DoS**. Os logs mostram que o servidor web para de responder após ser sobrecarregado com solicitações de pacotes SYN. Esse evento pode ser um tipo de ataque DoS chamado **inundação de SYN** (*SYN flooding*).

---

## Seção 2: Explicar como o ataque está causando o mau funcionamento do site

Quando os visitantes do site tentam estabelecer uma conexão com o servidor web, ocorre um aperto de mão de três vias (*three-way handshake*) usando o protocolo TCP. 



O aperto de mão consiste em três etapas:

1. Um pacote **SYN** é enviado da origem para o destino, solicitando a conexão.
2. O destino responde à origem com um pacote **SYN-ACK** para aceitar a solicitação de conexão. O destino reservará recursos para a origem se conectar.
3. Um pacote **ACK** final é enviado da origem para o destino, confirmando a permissão para conectar.

No caso de um ataque de inundação de SYN (*SYN flood*), um ator malicioso envia um grande número de pacotes SYN de uma só vez, o que sobrecarrega os recursos disponíveis do servidor reservados para a conexão. 



Quando isso acontece, não restam recursos no servidor para solicitações legítimas de conexão TCP.

Os logs indicam que o servidor web ficou sobrecarregado e não consegue processar as solicitações SYN dos visitantes. O servidor se torna incapaz de abrir novas conexões para novos visitantes, que, por sua vez, recebem uma mensagem de tempo limite de conexão.
