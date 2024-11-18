// Chave de API e URL da API de câmbio
const apiKey = 'c1e64802c179edb8142c9bb8';
const apiUrl = `https://open.er-api.com/v6/latest`;

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

// Função para carregar as moedas disponíveis na API
async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });

            // Define valores padrão
            fromCurrency.value = 'USD';
            toCurrency.value = 'BRL';
        } else {
            alert('Erro ao carregar moedas.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para converter moeda
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${from}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
            resultDiv.textContent = 'Erro ao converter.';
        }
    } catch (error) {
        console.error('Erro:', error);
        resultDiv.textContent = 'Erro ao acessar a API.';
    }
}

// Inicializa as moedas e configura eventos
loadCurrencies();
convertButton.addEventListener('click', convertCurrency);
