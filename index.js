const express = require('express');
const path = require('path');
const app = express();

// Statik dosyaları (HTML, CSS, JS) sunmak için 'public' klasörünü kullan
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

const items = {
    hot: {
        base: [
            'Şort', 'T-shirt', 'Güneş Kremi', 'Şapka', 'Güneş Gözlüğü', 'Plaj Havlusu',
            'Hafif Elbise', 'Keten Pantolon', 'Askılı Bluz', 'Terlik', 'Yazlık Ayakkabı',
            'Su Matarası', 'Aloe Vera Jeli', 'Güneş Sonrası Losyon', 'UV Koruyucu Gömlek',
            'İnce Çorap', 'Pamuklu İç Giyim', 'Yelpaze', 'Yazlık Şal', 'Pamuklu Gömlek',
            'Hafif Sırt Çantası', 'Kolonya', 'Yedek Şapka', 'Toka / Saç Bandı', 'Katlanabilir Alışveriş Çantası',
            'İnce Gece Kıyafeti', 'Kamp Havlusu', 'Deodorant', 'Yüz Maskesi (toz vs.)', 'Yara Bandı'
        ],
        extra: [
            'Sandalet', 'Mayo', 'Bikini', 'Deniz Gözlüğü', 'Şnorkel Takımı',
            'Plaj Çantası', 'Plaj Şemsiyesi', 'Suya Dayanıklı Telefon Kılıfı',
            'Güneş Enerjili Şarj Cihazı', 'Yüzme Bonesi', 'Plaj Sandalyesi', 'Hamak',
            'Sinek Kovucu Sprey', 'Soğutucu Çanta', 'Plaj Oyunları (frisbee, top)',
            'Kitap / Dergi', 'Bluetooth Hoparlör', 'Yüzme Eldiveni', 'Ayak Koruyucu',
            'Hafif Yağmurluk (muson bölgeleri için)'
        ]
    },
    cold: {
        base: [
            'Mont', 'Kazak', 'Pantolon', 'Bere', 'Atkı', 'Eldiven',
            'Kalın T-shirt', 'Sweatshirt', 'Kapüşonlu Mont', 'Polar Ceket',
            'Yün Çorap', 'İçi Polarlı Pantolon', 'Boyunluk', 'Kaban',
            'Soğuk Su Termosu', 'Su Geçirmez Ceket', 'Kalın İç Giyim',
            'Isıtıcı Pedler', 'Rüzgarlık', 'Kışlık Ayakkabı',
            'Sıcak Tutan İçlik', 'Termal Çamaşır', 'El Kremi', 'Dudak Koruyucu',
            'Çok Amaçlı Bıçak', 'Yedek Eldiven', 'Taşınabilir Kalorifer',
            'Kuru Gıda / Atıştırmalık', 'Isı Geçirmez Matara', 'Boyun Destekli Yastık'
        ],
        extra: [
            'Termal İçlik', 'Kalın Çorap', 'Bot', 'Kar Gözlüğü',
            'Isıtmalı Eldiven', 'Taşınabilir El Isıtıcısı', 'Kayak Maskesi',
            'Su Geçirmez Sırt Çantası', 'Isıtmalı Yelek', 'Bacak Isıtıcı',
            'Yedek Piller', 'Kar Eldiveni', 'İzotermal Battaniye', 'Termal İç Çamaşırı',
            'Sıcak Su Torbası', 'Soğuk Hava El Kremi', 'Yün Bere', 'Kamp Isıtıcısı',
            'Kayak Kaskı', 'Kar Ayakkabısı'
        ]
    },
    temperate: {
        base: [
            'Ceket', 'T-shirt', 'Kot Pantolon', 'Hırka', 'Yağmurluk',
            'Uzun Kollu Gömlek', 'Keten Ceket', 'Hafif Kazak', 'Çok Cepli Pantolon',
            'Şapka', 'Sırt Çantası', 'İnce Şal', 'Trençkot', 'Rahat Ayakkabı',
            'Pamuklu Kazak', 'Çorap', 'İnce İçlik', 'Sweatshirt', 'Yelek', 'Gömlek',
            'Boyunluk', 'Şarj Kablosu', 'Mini İlk Yardım Kiti', 'Katlanabilir Çanta',
            'Hafif Eldiven', 'Günlük El Çantası', 'Yürüyüş Pantolonu', 'Ayakkabı Torbası',
            'Suya Dayanıklı Kılıf', 'Notebook / Defter'
        ],
        extra: [
            'Spor Ayakkabı', 'Şemsiye', 'Katlanabilir Yağmurluk',
            'Yedek Ayakkabı', 'Polar Battaniye', 'Yürüyüş Batonları',
            'Yağmur Botu', 'Çamaşır Filesi', 'Mini İlk Yardım Kiti', 'Boyun Yastığı',
            'Deterjanlı Bez', 'Tablet / E-kitap', 'Müzik Kulaklığı', 'Yolculuk Atıştırmalığı',
            'Rahatlatıcı Çay', 'Çok Amaçlı Cüzdan', 'Yüzey Temizleyici Sprey',
            'Kamp Lambası', 'Taşınabilir Askılık', 'Seyahat Takvimi / Planlayıcı'
        ]
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
