export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      erro: 'Método não permitido',
      mensagem: 'Use POST para enviar dados'
    });
  }

  try {
    const dados = req.body;

    if (!dados.email || !dados.nome_completo) {
      return res.status(400).json({ 
        erro: 'Dados incompletos',
        mensagem: 'E-mail e nome são obrigatórios'
      });
    }

    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const googleResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(dados)
        });

        if (!googleResponse.ok) {
          console.error('Erro ao enviar para Google Sheets');
        }
      } catch (googleError) {
        console.error('Erro de conexão com Google Sheets:', googleError);
      }
    }

    console.log('📝 Novo formulário recebido:', {
      timestamp: new Date().toISOString(),
      nome: dados.nome_completo,
      email: dados.email,
      documento: dados.documento,
      telefone: dados.telefone,
      nome_loja: dados.nome_loja,
      instagram: dados.instagram,
      usar_drop: dados.usar_drop
    });

    return res.status(200).json({ 
      sucesso: true,
      mensagem: 'Formulário recebido com sucesso!',
      timestamp: new Date().toISOString()
    });

  } catch (erro) {
    console.error('❌ Erro ao processar formulário:', erro);
    
    return res.status(500).json({ 
      erro: 'Erro ao processar formulário',
      detalhes: erro.message,
      mensagem: 'Tente novamente em alguns momentos'
    });
  }
}

---FIM---


PRONTO! Você colou o segundo arquivo!

Agora clique no final da página:

Em "Commit message", escreva:
Adicionar API de envio de dados

Clique em "Commit new file"
