# 🛡️ Relatório de Escopo, Metas e Avaliação de Risco: Botium Toys

## 📋 Escopo e Objetivos da Auditoria
* **Escopo:** Todo o programa de segurança da Botium Toys, incluindo ativos físicos (equipamentos de funcionários), rede interna e sistemas integrados.
* **Objetivos:** Avaliar os ativos existentes e preencher o checklist de controles e conformidade para identificar lacunas de segurança e recomendar melhorias na postura defensiva da organização.

---

## 💻 Ativos Atuais
Os ativos gerenciados pelo Departamento de TI incluem:
* **Hardware On-premises:** Equipamentos locais para operações de escritório.
* **Dispositivos de Funcionários:** Desktops, laptops, smartphones, estações de trabalho remotas e periféricos.
* **Inventário de Vendas:** Produtos de vitrine (loja física) e estoque no armazém adjacente para vendas online.
* **Sistemas e Software:** Contabilidade, telecomunicações, banco de dados, e-commerce e gestão de inventário.
* **Infraestrutura de Rede:** Acesso à Internet e rede interna local.
* **Dados:** Retenção e armazenamento de informações críticas.
* **Sistemas Legados:** Manutenção de sistemas em fim de vida (End-of-Life) que exigem monitoramento humano.

---

## ⚠️ Avaliação de Risco

### Descrição do Risco
Atualmente, há uma gestão inadequada de ativos. A Botium Toys carece de controles de segurança fundamentais e pode estar em descumprimento com regulamentações dos EUA e padrões internacionais (PCI DSS, GDPR, SOC).

### Melhores Práticas (NIST CSF)
Seguindo a função **Identificar** do framework NIST, a organização deve:
1. Alocar recursos para identificação e gestão de ativos.
2. Classificar ativos existentes.
3. Determinar o impacto da perda de sistemas na continuidade dos negócios.



### Pontuação de Risco
| Métrica | Valor | Status |
| **Risk Score** | **8 / 10** | **Alto** |

---

## 🔍 Comentários Adicionais e Descobertas
O impacto potencial da perda de um ativo é classificado como **Médio**, enquanto o risco de multas regulatórias é **Alto**. 

**Pontos Críticos Identificados:**
* **Acesso Excessivo:** Todos os funcionários possuem acesso a dados internos sensíveis (PII/SPII) e dados de cartões de crédito.
* **Falha de Criptografia:** Dados de cartões de crédito não são criptografados durante o processamento ou armazenamento local.
* **Controle de Acesso:** Ausência de políticas de **Privilégio Mínimo** e **Separação de Deveres**.
* **Lacunas Técnicas:** Não há um Sistema de Detecção de Intrusão (IDS) instalado.
* **Resiliência:** Ausência de Planos de Recuperação de Desastres (DRP) e falta de backups de dados críticos.
* **Gestão de Identidade:** A política de senhas é nominal (fraca) e não há um sistema centralizado de gerenciamento de credenciais.
* **Conformidade GDPR:** Embora exista um plano de notificação de 72 horas, o acesso amplo a dados da U.E. por funcionários não autorizados compromete a conformidade.
* **Segurança Física:** A loja e o armazém possuem controles físicos adequados (trancas, CCTV e prevenção de incêndio).

---
