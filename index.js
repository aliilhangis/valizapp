const express = require('express');
const path = require('path');
const app = express();

// Statik dosyaları sunmak için public klasörünü kullan
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Ana sayfa için index.html dosyasını gönder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const items = {
    hot: {
        base: ['Şort', 'T-shirt', 'Güneş Kremi', 'Şapka', 'Güneş Gözlüğü', 'Plaj Havlusu'],
        extra: ['Sandalet', 'Mayo']
    },
    cold: {
        base: ['Mont', 'Kazak', 'Pantolon', 'Bere', 'Atkı', 'Eldiven'],
        extra: ['Termal İçlik', 'Kalın Çorap', 'Bot']
    },
    temperate: {
        base: ['Ceket', 'T-shirt', 'Kot Pantolon', 'Hırka', 'Yağmurluk'],
        extra: ['Spor Ayakkabı', 'Şemsiye']
    }
};

app.post('/generate', (req, res) => {
    const { climate, days } = req.body;

    if (!climate || !days) {
        return res.status(400).json({ error: 'Eksik parametre: climate ve days gereklidir.' });
    }

    if (!items[climate]) {
        return res.status(400).json({ error: 'Geçersiz iklim. "hot", "cold", veya "temperate" kullanın.' });
    }

    let suitcase = [...items[climate].base];

    if (days > 3) {
        suitcase.push(...items[climate].extra);
    }
    if (days > 7) {
        suitcase.push('Ekstra Kıyafetler (Uzun Konaklama)');
    }

    res.json({ suitcase });
});

module.exports = app; 