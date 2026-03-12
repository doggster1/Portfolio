Cenário

Analise o cenário abaixo. Em seguida, conclua as instruções passo a passo.

Você é um analista de segurança cibernética do yummyrecipesforme.com, um site que vende receitas e livros de receitas. Um ex-funcionário decidiu atrair os usuários para um site falso com malware. 

O ex-funcionário/hacker executou um ataque de força bruta para obter acesso ao host da Web. Ele digitou repetidamente várias senhas padrão conhecidas para a conta administrativa até adivinhar corretamente a senha certa. Depois de obterem as credenciais de login, eles conseguiram acessar o painel de administração e alterar o código-fonte do site. Eles incorporaram uma função javascript no código-fonte que solicitava aos visitantes que baixassem e executassem um arquivo ao visitar o site. Depois de incorporar o malware, o hacker alterou a senha da conta administrativa. Quando os clientes baixam o arquivo, eles são redirecionados para uma versão falsa do site que contém o malware. 

Várias horas após o ataque, vários clientes enviaram um e-mail para o helpdesk da yummyrecipesforme. Eles reclamaram que o site da empresa havia solicitado o download de um arquivo para acessar receitas gratuitas. Os clientes alegaram que, depois de executar o arquivo, o endereço do site mudou e seus computadores pessoais começaram a funcionar mais lentamente.

Em resposta a esse incidente, o proprietário do site tentou fazer login no painel de administração, mas não conseguiu, e entrou em contato com o provedor de hospedagem do site. Você e outros analistas de segurança cibernética têm a tarefa de investigar esse evento de segurança.

Para resolver o incidente, você cria um ambiente sandbox para observar o comportamento suspeito do site. Você executa o analisador de protocolo de rede tcpdump e, em seguida, digita o URL do site yummyrecipesforme.com. Assim que o site é carregado, é solicitado que você faça o download de um arquivo executável para atualizar seu navegador. Você aceita o download e permite que o arquivo seja executado. Em seguida, observa que seu navegador o redireciona para um URL diferente, greatrecipesforme.com, que contém o malware.

Os registros mostram o seguinte processo:

O navegador inicia uma solicitação de DNS: Ele solicita o endereço IP do URL yummyrecipesforme.com ao servidor DNS.

O DNS responde com o endereço IP correto.

O navegador inicia uma solicitação HTTP: Ele solicita a página da Web yummyrecipesforme.com usando o endereço IP enviado pelo servidor DNS.

O navegador inicia o download do malware.

O navegador inicia uma solicitação de DNS para greatrecipesforme.com.

O servidor DNS responde com o endereço IP de greatrecipesforme.com.

O navegador inicia uma solicitação HTTP para o endereço IP de greatrecipesforme.com.

Um analista sênior confirma que o site foi comprometido. O analista verifica o código-fonte do site. Ele percebe que o código javascript foi adicionado para solicitar aos visitantes do site o download de um arquivo executável. A análise do arquivo baixado encontrou um script que redireciona os navegadores dos visitantes de yummyrecipesforme.com para greatrecipesforme.com.

A equipe de segurança cibernética relata que o servidor da Web foi afetado por um ataque de força bruta. O hacker insatisfeito conseguiu adivinhar a senha facilmente porque a senha do administrador ainda estava definida como a senha padrão. Além disso, não havia controles em vigor para evitar um ataque de força bruta.

Sua tarefa é documentar o incidente em detalhes, incluindo a identificação dos protocolos de rede usados para estabelecer a conexão entre o usuário e o site. Você também deve recomendar uma ação de segurança a ser tomada para evitar ataques de força bruta no futuro.
