document.addEventListener('DOMContentLoaded', () => {
    const battleWatch = document.getElementById('battle-watch');
    const intelInfo = document.getElementById('intel-info');
    const searchInput = document.getElementById('target-search');
    const targetTableBody = document.querySelector('#target-table tbody');

    let watchlistStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150.54, change: 0.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.66, change: -1.2 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3401.46, change: 2.1 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 299.35, change: -0.3 }
    ];

    const allStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150.54, change: 0.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.66, change: -1.2 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3401.46, change: 2.1 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 299.35, change: -0.3 },
    ];

    function fetchStockData(symbol) {
        const mockData = {
            AAPL: { price: 150.54, change: 0.5 },
            GOOGL: { price: 2800.66, change: -1.2 },
            AMZN: { price: 3401.46, change: 2.1 },
            MSFT: { price: 299.35, change: -0.3 },
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(mockData[symbol]), 50);
        });
    }

    function displayStockInfo(stock) {
        fetchStockData(stock.symbol)
        .then((data) => {
            const changeClass = data.change >= 0 ? 'positive' : 'negative';
            intelInfo.innerHTML = `
                <h3>${stock.name} (${stock.symbol})</h3>
                <p>Price: $${data.price.toFixed(2)}</p>
                <p class="${changeClass}">Change: ${data.change}%</p>
            `;
        });
    }

    function updateBattleWatch() {
        battleWatch.innerHTML = '';
        watchlistStocks.forEach((stock) => {
            const li = document.createElement('li');
            li.textContent = `${stock.name} (${stock.symbol}) `;
            li.classList.add('list-item');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove');
            removeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                watchlistStocks = watchlistStocks.filter(item => item.symbol !== stock.symbol);
                updateBattleWatch();
                displayStockTable(allStocks);
            });
            li.appendChild(removeButton);

            li.addEventListener('click', () => {
                displayStockInfo(stock);
            });

            battleWatch.appendChild(li);
        });
    }

    function displayStockTable(stocks) {
        targetTableBody.innerHTML = '';
        stocks.forEach((stock) => {
            const changeClass = stock.change >= 0 ? 'positive' : 'negative';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${stock.name}</td>
                <td>$${stock.price.toFixed(2)}</td>
                <td class="${changeClass}">${stock.change}%</td>
                <td class="actions"></td>
            `;
            const actionsTd = tr.querySelector('.actions');

            if (!watchlistStocks.some(item => item.symbol === stock.symbol)) {
                const addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.classList.add('add');
                addButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    watchlistStocks.push(stock);
                    updateBattleWatch();
                    displayStockTable(allStocks);
                });
                actionsTd.appendChild(addButton);
            } else {
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove');
                removeButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    watchlistStocks = watchlistStocks.filter(item => item.symbol !== stock.symbol);
                    updateBattleWatch();
                    displayStockTable(allStocks);
                });
                actionsTd.appendChild(removeButton);
            }

            tr.addEventListener('click', () => {
                displayStockInfo(stock);
            });

            targetTableBody.appendChild(tr);
        });
    }

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredStocks = allStocks.filter(stock =>
            stock.name.toLowerCase().includes(searchTerm) ||
            stock.symbol.toLowerCase().includes(searchTerm)
        );
        displayStockTable(filteredStocks);
    });

    displayStockTable(allStocks);
    updateBattleWatch();
});