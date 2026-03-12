# Relatório de Avaliação de Riscos de Segurança

## Parte 1: Selecione até três ferramentas e métodos de *hardening* para implementação

Para proteger a rede da organização contra ataques futuros e mitigar vulnerabilidades, recomendo a implementação das seguintes tarefas de fortalecimento de segurança (*hardening*):

1. Atualizações de *patches* (*Patch updates*)
2. Autenticação multifatorial (MFA)
3. Desativação de portas não utilizadas (*Disabling unused ports*)

---

## Parte 2: Explique suas recomendações

Abaixo estão os motivos pelos quais os métodos selecionados são eficazes e a frequência com que devem ser implementados:

* **Atualizações de *patches*:**
    * **Por que é eficaz:** A aplicação de *patches* corrige vulnerabilidades de segurança conhecidas em softwares e sistemas operacionais. Quando um *patch* é lançado, os invasores descobrem a falha e tentam explorá-la rapidamente. Manter os sistemas atualizados fecha essas brechas antes que possam ser usadas para comprometer a rede.
    * **Com que frequência:** Deve ser implementada **regularmente e continuamente**. Idealmente, os *patches* críticos devem ser aplicados assim que testados e disponibilizados pelos fornecedores.

* **Autenticação multifatorial (MFA):**
    * **Por que é eficaz:** A MFA adiciona uma camada extra de segurança vital. Mesmo que um invasor consiga adivinhar, roubar ou quebrar a senha de um funcionário (por meio de um ataque de força bruta ou *phishing*), ele ainda precisará de um segundo fator de verificação (como um código no celular ou biometria) para acessar a rede, o que inviabiliza a maioria dos ataques de credenciais.
    * **Com que frequência:** A configuração inicial é feita **uma vez** para cada usuário ou sistema crítico, e depois a técnica é **mantida e exigida continuamente** a cada tentativa de login.

* **Desativação de portas não utilizadas:**
    * **Por que é eficaz:** Portas abertas e sem uso em firewalls, roteadores e servidores são como portas destrancadas em um prédio: elas oferecem um caminho fácil para agentes maliciosos entrarem na rede. Desativá-las reduz significativamente a "superfície de ataque", impedindo a passagem de tráfego perigoso.
    * **Com que frequência:** Deve ser implementada como uma configuração de **linha de base (*baseline*) inicial** e revisada **periodicamente** (por exemplo, durante a manutenção regular do firewall ou auditorias de segurança) para garantir que nenhuma porta tenha sido aberta desnecessariamente.
