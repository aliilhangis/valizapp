document.getElementById('suitcase-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const climate = document.getElementById('climate').value;
    const days = document.getElementById('days').value;
    const listElement = document.getElementById('suitcase-list');
    const resultDiv = document.getElementById('result');

    listElement.innerHTML = '<li>Liste oluşturuluyor...</li>';
    resultDiv.classList.remove('hidden');

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ climate, days: parseInt(days) }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Bir hata oluştu.');
        }

        const data = await response.json();
        
        listElement.innerHTML = '';
        if (data.suitcase && data.suitcase.length > 0) {
            data.suitcase.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                listElement.appendChild(li);
            });
        } else {
            listElement.innerHTML = '<li>Bu koşullar için önerilen eşya bulunamadı.</li>';
        }

    } catch (error) {
        listElement.innerHTML = `<li>Hata: ${error.message}</li>`;
        resultDiv.classList.remove('hidden');
    }
}); 
