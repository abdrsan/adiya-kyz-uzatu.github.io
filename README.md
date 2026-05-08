# Әдияның Қыз Ұзату Тойы - Wedding Website

## Құпия сәйкестендіру (Secret Setup)

### 1. Google Apps Script API ключін орнату

1. `.env.example` файлын көшіріп `.env` жасаңыз:
```bash
cp .env.example .env
```

2. `.env` файлын ашып `YOUR_ACTUAL_API_KEY_HERE` орнына шынайы Google Apps Script API ключінізді қойыңыз

### 2. GitHub Pages орнату

1. Репозиторийді GitHub-ға жүктеңіз:
```bash
git remote add origin https://github.com/abdrsan/adiya-kyz-uzatu.github.io.git
git push -u origin main
```

2. GitHub репозиторийде Settings → Pages орнатыңыз:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root

### 3. Қауіпсіздік

- `config.js` файлы `.gitignore`-ге қосылған
- API ключі `.env` файлында сақталады
- GitHub-ға жүктегенде құпия деректер жоқ

## Сипаттамасы

- Қазақша luxury дизайн
- RSVP формасы Google Apps Script арқылы
- Адаптивті мобильді дизайн
- Музыкалық фон
- Кері санақ таймер
