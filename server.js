const express = require('express');
const app = express();
const port = 3003;
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    try {
        res.status(200).send({
            "message": "API Works!!!"
        })
    } catch (error) {
        res.status(404).send({
            "message": "Error all access!"
        })
    }
})

app.post('/message', async (req, res) => {
    try {
        const message = req.body.message;

        // Função para obter o sentimento da frase
        function getSentiment(phrase) {
            var ptLanguage = {

                labels: {
                    'porra': -2,
                    'presta': -1,
                    'enrolação': -2,
                    'enganosa': -2,
                    'enganoso': -2,
                    'cumpre': -2,
                    'sem': -1,
                    'demoravam': -1,
                    'demora': -1,
                    'demoravão': -1,
                    'quero': +1,
                    'top': +2,
                    'opa': 0,
                    'certo': +1,
                    'certo': +1,
                    'vadia': -5,
                    'mau': -1,
                    'mal': -1,
                    'mas': -1,
                    'ninguém': -1,
                    'empenhado': -1,
                    'matar': -1,
                    'sol':-1,
                    'fode': -1,
                    'desempregado': -1,
                    'desempregada': -1,
                    'demora': -1,
                    'demorava': -1,
                    'demorou': -1,
                    'uber': -1,
                    'cobre': -1,
                    'cobria':-1,
                    'cobria': -1,
                    'cobertura': -1,
                    'guincho': -1,
                    'terceirizado': -1,
                    'chinelona': -5,
                    'terceirizada': -1,
                    'acidente': -1,
                    'colidir': -1,
                    'colisão': -1,
                    'colidiu': -1,
                    'errado': -1,
                    'errada': -1,
                    'culpado': -1,
                    'culpada': -1,
                    'caralho': -5,
                    'pnc': -5,
                    'cu': -5,
                    'pau':-2,
                    'lazarento': -5,
                    'ordinario': -5,
                    'quenga': -5,
                    'fdp': -5,
                    'viado': -5,
                    'rapariga': -5,
                    'baitola': -5,
                    'balde': -5,
                    'filha da puta': -5,
                    'filho duma egua': -5,
                    'desgraçado': -5,
                    'arrombado': -5,
                    'arrombada': -5,
                    'puta': -5,
                    'corno': -5,
                    'gay': -5,
                    'esperava': -1,
                    'desapontado': -1,
                    'desapontada': -1,
                    'recomendaria': -1,
                    'insatisfatório': -1,
                    'porcaria': -1,
                    'idiota': -1,
                    'bosta': -1,
                    'jegue': -1,
                    'jumento': -1,
                    'inutil': -1,
                    'droga': -1,
                    'péssimo': -3,
                    'decepcionado': -1,
                    'esperava mais': -1,
                    'decepcionada': -1,
                    'ruim': -1,
                    'merda': -2,
                    'vagabundo': -1,
                    'vagabunda': -1,
                    'demorava': -2,
                    'idiota': -1,
                    'odiei': -1,
                    'odeio': -1,
                    'desgraça': -1,
                    'imundo': -1,
                    'ridiculo': -1,
                    'bosta': -1,
                    'inutil': -1,
                    'burro': -1,
                    'infelizmente ': -1,
                    'prestador': -1,
                    'prestadora': -1,
                    'amento': -1,
                    'covarde': -1,
                    'materialista': -1,
                    'cancelei': -1,
                    'gostava': +3,
                    'gostei': +3,
                    'gosto': +3,
                    'horrivel': -2,
                    "insatisfeito": -1,
                    "péssimo": -1,
                    "cancelei": -1,
                    "demorava": -1,
                    "desgostoso": -1,
                    "desprezível": -1,
                    "repugnante": -1,
                    "agoniante": -1,
                    "miserável": -1,
                    "abominável": -1,
                    "deplorável": -1,
                    "detestável": -1,
                    "desesperançoso": -1,
                    "infernal": -1,
                    "horrendo": -1,
                    "desastroso": -1,
                    "inquietante": -1,
                    "infeliz": -1,
                    "desalentador": -1,
                    "perturbador": -1,
                    "penoso": -1,
                    "doloroso": -1,
                    "desgastante": -1,
                    "opressivo": -1,
                    "desanimador": -1,
                    "assustador": -1,
                    "desalentador": -1,
                    "desolador": -1,
                    "atroz": -1,
                    "cansativo": -1,
                    "abatido": -1,
                    "sombrio": -1,
                    "sombrío": -1,
                    "desafiador": -1,
                    "preocupante": -1,
                    "desconcertante": -1,
                    "frustrante": -1,
                    "desanimador": -1,
                    "desolado": -1,
                    "fúnebre": -1,
                    "tenebroso": -1,
                    "desconcertante": -1,
                    "ruim": -1,
                    "desapontado": -1,
                    "desanimado": -1,
                    "terrível": -1,
                    "lamentável": -1,
                    "horrível": -1,
                    "decepcionado": -1,
                    "angustiante": -1,
                    "desesperador": -1,
                    "aborrecido": -1,
                    "desanimador": -1,
                    "desesperador": -1,
                    "desastroso": -1,
                    "desagradável": -1,
                    "irritado": -1,
                    "chateado": -1,
                    "triste": -1,
                    "insatisfeito": -1,
                    "ruim": -1,
                    "desapontado": -1,
                    "terrível": -1,
                    "horrível": -1,
                    "decepcionado": -1,
                    "triste": -1,
                    "chateado": -1,
                    "irritado": -1,
                    "desagradável": -1,
                    "desastroso": -1,
                    "desanimador": -1,
                    "desesperador": -1,
                    "angustiante": -1,
                    "desalentador": -1,
                    "desanimado": -1,
                    "aborrecido": -1,
                    "atroz": -1,
                    "cruel": -1,
                    "desumano": -1,
                    "desolador": -1,
                    "desgraçado": -1,
                    "melancólico": -1,
                    "nevrálgico": -1,
                    "tétrico": -1,
                    "trágico": -1,
                    "lastimável": -1,
                    "apavorante": -1,
                    "desconcertante": -1,
                    "angustiante": -1,
                    "lamentável": -1,
                    'bem':+1,
                    'bom':+1,
                    'ótimo':+2,
                    'perfeito':+2,
                    'risco':-1,
                    'vandalismo':-1,
                    'revoltado':-1,
                    'porco':-1,
                    'sacanagem':-1,
                    'sacaneia':-1,
                    'cancelamento': -1,
                    // Adicione mais rótulos conforme necessário
                }

            };

            // Registre o idioma português com os rótulos definidos
            sentiment.registerLanguage('pt', ptLanguage);

            // Analise a frase em português
            var result = sentiment.analyze(phrase, {
                language: 'pt'
            });

            return result;
        }

        // Obtenha o resultado da análise de sentimento
        var sentimentResult = getSentiment(message);

        res.status(200).send({
            data: sentimentResult,
            message: "Análise realizada com sucesso!"
        });

    } catch (error) {
        res.status(404).send({
            "message": "Erro de acesso!"
        });
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando...`);
});