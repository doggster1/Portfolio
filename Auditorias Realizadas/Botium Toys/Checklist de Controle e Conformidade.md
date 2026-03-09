# 🛡️ Checklist de Controles e Conformidade - Botium Toys

Este documento apresenta a avaliação atual dos controles de segurança e o status de conformidade da **Botium Toys**, baseado nos frameworks de cibersegurança e requisitos regulatórios.

---

## 🛠️ Avaliação de Controles

**Pergunta:** A Botium Toys possui atualmente este controle implementado?

| Status | Controle | Categoria |
| :---: | :--- | :--- |
| [N] | **Privilégio Mínimo** (Least Privilege) | Administrativo |
| [N] | **Planos de Recuperação de Desastres** (DRP) | Administrativo |
| [N] | **Políticas de Senha** | Administrativo |
| [N] | **Separação de Deveres** (Separation of duties) | Administrativo |
| [S] | **Firewall** | Técnico |
| [N] | **Sistema de Detecção de Intrusão (IDS)** | Técnico |
| [N] | **Backups** | Técnico |
| [S] | **Software Antivírus (AV)** | Técnico |
| [N] | **Monitoramento Manual de Sistemas Legados** | Técnico |
| [N] | **Criptografia** (Encryption) | Técnico |
| [N] | **Sistema de Gerenciamento de Senhas** | Técnico |
| [S] | **Fechaduras** (Escritórios, loja, armazém) | Físico |
| [S] | **Circuito Fechado de TV (CCTV)** | Físico |
| [S] | **Detecção/Prevenção de Incêndio** (Sprinklers) | Físico |

---

## ⚖️ Checklist de Conformidade (Compliance)

**Pergunta:** A Botium Toys adere atualmente a esta melhor prática?

### 💳 PCI DSS (Cartões de Pagamento)
- [N] Apenas usuários autorizados acessam dados de cartão de crédito.
- [N] Dados de cartão são processados/transmitidos em ambiente seguro.
- [N] Procedimentos de criptografia em todos os pontos de contato.
- [N] Políticas de gerenciamento de senhas seguras adotadas.

### 🇪🇺 GDPR (Proteção de Dados - UE)
- [N] Dados de clientes da U.E. são mantidos privados/seguros.
- [S] Plano de notificação de brecha em até 72 horas estabelecido.
- [N] Dados devidamente classificados e inventariados.
- [S] Políticas de privacidade documentadas e aplicadas.

### 📑 SOC (Tipo 1 e Tipo 2)
- [N] Políticas de acesso de usuários estabelecidas.
- [N] Dados sensíveis (PII/SPII) são confidenciais/privados.
- [S] Integridade dos dados é validada e consistente.
- [N] Dados estão disponíveis para indivíduos autorizados.

---

## 🛡️ Recomendações do Especialista (Plano de Ação)

Com base na pontuação de risco **8/10**, as seguintes ações são recomendadas para mitigar vulnerabilidades críticas e evitar multas regulatórias.

### 🚨 Prioridade 1: Segurança de Dados e Conformidade (Imediato)
* **Implementar Criptografia AES-256:** Criptografar dados de cartões de crédito em repouso e em trânsito (Essencial para PCI DSS).
* **Estabelecer o Princípio do Privilégio Mínimo (PoLP):** Restringir o acesso aos dados internos apenas ao necessário.
* **Implementar Separação de Deveres:** Evitar que uma única pessoa tenha controle total sobre transações ou alterações críticas.

### 💾 Prioridade 2: Resiliência e Continuidade de Negócios
* **Criar um Plano de Recuperação de Desastres (DRP):** Procedimentos para restaurar operações após incidentes graves.
* **Estratégia de Backup 3-2-1:** 3 cópias, 2 mídias diferentes, 1 offline/nuvem.
* **Instalação de IDS:** Monitorar tráfego de rede para identificar atividades suspeitas em tempo real.

### 🔑 Prioridade 3: Gestão de Identidade e Higiene Cibernética
* **Gerenciador de Senhas Corporativo:** Eliminar o compartilhamento inseguro de credenciais.
* **Nova Política de Senhas e MFA:** Exigir complexidade (12+ caracteres) e Autenticação de Dois Fatores.
* **Sistemas Legados:** Formalizar cronograma de manutenção semanal para sistemas em fim de vida.

---

### 📈 Benefícios Esperados
* **Redução da Pontuação de Risco:** De **8/10** para menos de **3/10**.
* **Conformidade Legal:** Alinhamento com **GDPR** e **PCI DSS**.
* **Confiança:** Proteção da reputação da marca e segurança no e-commerce.

> [!NOTE]
> A implementação deve seguir as diretrizes do framework **NIST CSF** para garantir defesa em profundidade.
