import { addLocaleData, defineMessages } from 'react-intl';
import en from './locales/en.js';
import fr from './locales/fr.js';
import es from './locales/es.js';

export default class LocalisationStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.bindActions(this.AppActions);

        this.locales = {};
        this.currentLocale = null;
        this.currentMessages = en;
        this.currentLabel = 'English';

        this.lang = {
            locale: 'en',
            label: 'English'
        };

        this.availableLanguages = [
            {
                locale: 'en',
                label: 'English'
            },
            {
                locale: 'es',
                label: 'Spanish'
            },
            {
                locale: 'fr',
                label: 'French'
            }
        ];

        this.exportPublicMethods({
            loadLocale: this.loadLocale.bind(this),

            // public getters
            getAvailableLanguages: this.getAvailableLanguages.bind(this),
            getCurrentLocale: this.getCurrentLocale.bind(this),
            getCurrentMessages: this.getCurrentMessages.bind(this),
            getCurrentLabel: this.getCurrentLabel.bind(this),
            dehydrate: this.dehydrate.bind(this),

            // public setters
            setCurrentLanguage: this.setCurrentLanguage.bind(this),
            rehydrate: this.rehydrate.bind(this)
        });

        // loading messages
        // addLocaleData(this.currentMessages);
        const messages = defineMessages(this.currentMessages);
    }

    // it stores the current locale and it loads the messages of that language
    loadLocale(locale) {
        this.currentLocale = locale;
        if (locale === 'en') {
            this.currentMessages = en;
            this.currentLabel = 'English';
        } else if (locale === 'es') {
            this.currentMessages = es;
            this.currentLabel = 'Espanol';
        } else if (locale === 'fr') {
            this.currentMessages = fr;
            this.currentLabel = 'Francais';
        }
    }

    // listener
    onChangeLanguage(lang) {
        let newURL;
        let pathname;
        // switching to english, removing the locale from the URL
        if (lang.locale === 'en') {
            pathname = window.location.pathname.replace('/' + this.currentLocale, '');
            newURL = window.location.origin + pathname;
        } else {
            // coming from english
            if (this.currentLocale === 'en') {
                pathname =  window.location.pathname.slice(1, window.location.pathname.length);
                newURL = window.location.origin + '/' + lang.locale;
                pathname.length > 0 ? newURL += ('/' + pathname) : null;
            } else {
                //switching between two non-english languages
                newURL = window.location.href.replace('/' + this.currentLocale, '/' + lang.locale);
            }
        }
        window.location.assign(newURL);
    }

    // getter
    getCurrentMessages() {
        return this.currentMessages;
    }

    getLocales() {
        return this.locales;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    getAvailableLanguages() {
        return this.availableLanguages;
    }

    getCurrentLanguage() {
        return this.lang;
    }

    getCurrentLabel() {
        return this.currentLabel;
    }

    setCurrentLanguage(lang) {
        this.lang = lang;
    }

    // full getter
    dehydrate() {
        return {
            currentLocale: this.currentLocale,
            locales: this.locales,
            messages: this.messages
        };
    }

    // full setter
    rehydrate({ messages, locales, currentLocale }) {
        this.messages = messages;
        this.locales = locales;
        this.currentLocale = currentLocale;
    }

}
