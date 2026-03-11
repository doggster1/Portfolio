# 🚨 Relatório de Análise de Incidente: Ataque de Negação de Serviço (DoS)

## 📋 Resumo do Cenário
Na tarde de [Data do Incidente], o sistema de monitoramento emitiu um alerta automatizado referente a uma falha no servidor web principal. O servidor hospeda a página de vendas e promoções da agência, utilizada ativamente pelos funcionários para pesquisar pacotes de férias para clientes. A investigação confirmou que o servidor estava sob um ataque cibernético, resultando em inatividade (Downtime) e erros de "Tempo Limite de Conexão" (Connection Timeout).

---

## 🔍 1. Identificação do Ataque

Com base na análise do tráfego de rede utilizando um *sniffer* de pacotes, foi detectado um volume massivo de solicitações **TCP SYN** originadas de um endereço IP desconhecido. 

**Diagnóstico:** O servidor web foi vítima de um ataque **TCP SYN Flood**.
> Um ataque SYN Flood é uma forma de ataque de Negação de Serviço (DoS - Denial of Service) em que o invasor envia rapidamente uma sucessão de solicitações SYN (sincronização) para o sistema alvo. O objetivo é consumir recursos suficientes do servidor para torná-lo incapaz de responder ao tráfego legítimo.



---

## 💥 2. Impacto do Ataque

O ataque afetou tanto a infraestrutura técnica quanto as operações de negócios da agência:

* **Impacto no Servidor:** O servidor web esgotou sua capacidade de manter conexões semiabertas (half-open connections). Sobrecarregado pelo tráfego malicioso, ele perdeu a capacidade de processar novas solicitações legítimas.
* **Impacto nos Funcionários/Negócios:** O site de vendas ficou inacessível. Isso paralisou a capacidade dos funcionários de acessar pacotes de férias, resultando em perda de produtividade, interrupção do atendimento ao cliente e potencial perda de vendas.

---

## 🛡️ 3. Ações de Resposta Imediata (Contenção)

Para estancar o ataque e restaurar os serviços, as seguintes ações paliativas foram executadas:

1.  **Isolamento Temporário:** O servidor foi temporariamente colocado offline para limpar as conexões pendentes, liberar recursos e permitir que o sistema retornasse ao status operacional normal.
2.  **Bloqueio de IP:** Uma regra foi adicionada ao firewall corporativo para bloquear todo o tráfego de entrada proveniente do endereço IP agressor que estava gerando a enxurrada de solicitações SYN.

---

## ⚠️ 4. Limitações da Solução Atual e Riscos Contínuos

Embora o serviço tenha sido restaurado, a solução de bloqueio de IP é apenas uma correção temporária (*band-aid*). 

**O Risco de IP Spoofing:** Atacantes sofisticados raramente usam seu IP real ou um único IP de forma contínua. É altamente provável que o agente mal-intencionado comece a usar **IP Spoofing** (falsificação de endereço IP) ou utilize uma botnet (transformando o ataque em um **DDoS** - *Distributed Denial of Service*) para contornar o bloqueio atual do firewall.

---

## 🚀 5. Próximos Passos e Recomendações (Para discussão com a Diretoria)

Para evitar que esse problema ocorra novamente e garantir a disponibilidade da página de vendas, recomendo a implementação imediata das seguintes medidas de segurança:

* **Implementação de SYN Cookies:** Configurar o servidor/firewall para usar SYN cookies. Isso permite que o servidor evite alocar recursos para uma conexão até que o aperto de mão TCP (TCP handshake) seja totalmente concluído.
* **Ajuste de Limites de Tempo (Timeouts):** Reduzir o tempo que o servidor aguarda por um pacote ACK antes de descartar uma conexão semiaberta.
* **Implementação de um WAF / Proteção Anti-DDoS:** Contratar um serviço de mitigação de DDoS em nuvem (como Cloudflare, AWS Shield, ou Akamai) para filtrar tráfego malicioso em larga escala antes que ele atinja nossa rede local.
* **Rate Limiting (Limitação de Taxa):** Configurar o roteador ou firewall para limitar o número máximo de pacotes SYN aceitos por segundo a um limite razoável para o nosso volume de negócios.
