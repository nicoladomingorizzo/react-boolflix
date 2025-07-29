export const languageToCountryMap = {
    'en': 'US', // Inglese -> Stati Uniti (o 'GB' per Regno Unito)
    'it': 'IT', // Italiano -> Italia
    'fr': 'FR', // Francese -> Francia
    'de': 'DE', // Tedesco -> Germania
    'es': 'ES', // Spagnolo -> Spagna
    'ja': 'JP', // Giapponese -> Giappone
    'ko': 'KR', // Coreano -> Corea del Sud
    'zh': 'CN', // Cinese -> Cina (o 'TW' per Taiwan, 'HK' per Hong Kong)
    'ru': 'RU', // Russo -> Russia
    'pt': 'PT', // Portoghese -> Portogallo (o 'BR' per Brasile)
    'hi': 'IN', // Hindi -> India
    'ar': 'SA', // Arabo -> Arabia Saudita (o un altro paese arabo)
    'sv': 'SE', // Svedese -> Svezia
    'nl': 'NL', // Olandese -> Paesi Bassi
    // Aggiungi qui altre mappature necessarie
};

//NOTE: Nota bene, per stilare questa lista mi sono fatto aiutare da gemini :P

// Funzione per ottenere il codice paese dal codice lingua e prendere solo la parte prima del trattino
function getCountryCodeFromLanguage(languageCode) {
    const baseLanguageCode = languageCode?.split('-')[0]; // Prende la parte prima del trattino
    return languageToCountryMap[baseLanguageCode] || null; // Restituisce null se non trova una corrispondenza
}
export default getCountryCodeFromLanguage;