import { Address6, Address4 } from 'ip-address';
import { validate, version } from 'uuid';
import JSON5 from 'json5';
import jwtDecode from 'jwt-decode';

function inferDatetime(value) {
    const rfc3339Match = inferRFC3339(value);
    if (rfc3339Match) {
        return rfc3339Match;
    }
    const rfc2822Match = inferRFC2822(value);
    if (rfc2822Match) {
        return rfc2822Match;
    }
    return undefined;
}
const rfc3339WithYmd = /^([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
const rfc3339WithWeekIndex = /^(\d{4})-?W(\d\d)(?:-?(\d))?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
const rfc3339WithOrdinal = /^(\d{4})-?(\d{3})?(?:[T\s](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
const rfc3339TimeOnly = /^(?:(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z?)|([+-]\d\d)(?::?(\d\d))?))?(?:\[([A-Za-z/_-]+)\])?(?:\[(u-ca=(?:buddhist|chinese|coptic|dangi|ethioaa|ethiopic|gregory|hebrew|indian|islamic|islamic-umalqura|islamic-tbla|islamic-civil|islamic-rgsa|islamicc|iso8601|japanese|persian|roc))\])?$/;
const rfc3339 = [
    {
        matches: rfc3339WithYmd,
        parts: rfc3339Parts,
        extensions: rfc3339Extensions(11, 12),
    },
    {
        matches: rfc3339WithWeekIndex,
        parts: rfc3339Parts,
        extensions: rfc3339Extensions(11, 12),
    },
    {
        matches: rfc3339WithOrdinal,
        parts: rfc3339WithOrdinalParts,
        extensions: rfc3339Extensions(10, 11),
    },
    {
        matches: rfc3339TimeOnly,
        parts: () => "time",
        extensions: rfc3339Extensions(8, 9),
    },
];
function matchFilter(matches) {
    if (!matches) {
        return false;
    }
    const truthyMatches = matches.filter((match) => !!match);
    return truthyMatches.length > 2;
}
function inferRFC3339(value) {
    const rfc3339Matches = rfc3339
        .map((rfc) => {
        return {
            matches: rfc.matches.exec(value),
            parts: rfc.parts,
            extensions: rfc.extensions,
        };
    })
        .filter((rfc) => matchFilter(rfc.matches));
    const rfc3339BestMatch = rfc3339Matches.sort(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (a, b) => b.matches.length - a.matches.length)[0];
    if (rfc3339BestMatch) {
        return {
            name: "datetime",
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            parts: rfc3339BestMatch.parts(rfc3339BestMatch.matches),
            variant: "rfc3339",
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            extensions: rfc3339BestMatch.extensions(rfc3339BestMatch.matches),
        };
    }
    return undefined;
}
function rfc3339Parts(match) {
    const dateParts = [1, 2, 3];
    const timeParts = [4, 5, 6, 7];
    const hasSomeDateParts = dateParts.some((i) => match[i] !== undefined);
    const hasSomeTimeParts = timeParts.some((i) => match[i] !== undefined);
    if (hasSomeDateParts && hasSomeTimeParts) {
        return "datetime";
    }
    return "date";
}
function rfc3339Extensions(timezoneIndex = 11, calendarIndex = 12) {
    return (match) => {
        const extensions = [];
        if (match[timezoneIndex] !== undefined) {
            extensions.push("timezone");
        }
        if (match[calendarIndex] !== undefined) {
            extensions.push("calendar");
        }
        return extensions.length > 0 ? extensions : undefined;
    };
}
function rfc3339WithOrdinalParts(match) {
    const dateParts = [1, 2];
    const timeParts = [3, 4, 5, 6];
    const hasSomeDateParts = dateParts.some((i) => match[i] !== undefined);
    const hasSomeTimeParts = timeParts.some((i) => match[i] !== undefined);
    if (hasSomeDateParts && hasSomeTimeParts) {
        return "datetime";
    }
    return "date";
}
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function inferRFC2822(value) {
    const rfc2822Matches = rfc2822.exec(value);
    if (rfc2822Matches) {
        return {
            name: "datetime",
            parts: "datetime",
            variant: "rfc2822",
        };
    }
    return undefined;
}

const timestampSecondsSinceEpoch = /^\d{10}$/;
const timestampMsSinceEpoch = /^\d{13}$/;
const timestampNanoSinceEpoch = /^\d{19}$/;
// If the msSinceEpoch is within 2 years of the current time, then inRangeOfNow will be true
function inRangeOfNow(msSinceEpoch) {
    const now = new Date().getTime();
    const acceptableRange = 2 * 365 * 24 * 60 * 60 * 1000;
    const lowerBound = msSinceEpoch - acceptableRange;
    const upperBound = msSinceEpoch + acceptableRange;
    return now >= lowerBound && now <= upperBound;
}
function inferTimestamp(value) {
    if (typeof value === "number") {
        return inferTimestamp(`${value}`);
    }
    if (timestampSecondsSinceEpoch.test(value)) {
        const seconds = parseInt(value);
        if (inRangeOfNow(seconds * 1000)) {
            return {
                name: "timestamp",
                variant: "secondsSinceEpoch",
            };
        }
    }
    if (timestampMsSinceEpoch.test(value)) {
        const milliseconds = parseInt(value);
        if (inRangeOfNow(milliseconds)) {
            return {
                name: "timestamp",
                variant: "millisecondsSinceEpoch",
            };
        }
    }
    if (timestampNanoSinceEpoch.test(value)) {
        const nanoseconds = parseInt(value);
        if (inRangeOfNow(nanoseconds / 1000000)) {
            return {
                name: "timestamp",
                variant: "nanosecondsSinceEpoch",
            };
        }
    }
    return undefined;
}

const rfc5321AddressRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
const rfc5321Regex = new RegExp(`^${rfc5321AddressRegex.source}$`);
const rfc5322Regex = new RegExp(`^[^"]+<${rfc5321AddressRegex.source}>$`);
function inferEmail(value) {
    if (rfc5321Regex.exec(value)) {
        return { name: "email", variant: "rfc5321" };
    }
    if (rfc5322Regex.exec(value)) {
        return { name: "email", variant: "rfc5322" };
    }
    return undefined;
}

const iso4217Regex = /^(?:(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTC|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWL))$/i;
const cryptoRegex = /^(?:(XBT|XDG|XLM|XMR|XRP|XZC|ETH|LTC|BNB|USDT|SOL|ADA|USDC|LUNA|AVAX|DOT|DOGE|SHIB|MATIC|CRO|BUSD|WBTC|UNI|LINK|UST|DAI|ALGO|BCH))$/;
const englishNamesRegex = /^(?:(U.?S.?\sDollar|Euro|United\sStates\sdollar|Japanese\sYen|Swiss\sFranc|Australian\sDollar|British\sPound|Canadian\sDollar|South\sAfrican\sRand))$/;
const symbolRegex = /^(?:(\$|£|€|¥|R\$|₿))$/;
function inferCurrency(value) {
    if (iso4217Regex.exec(value)) {
        return {
            name: "currency",
            variant: "iso4217",
        };
    }
    if (cryptoRegex.exec(value)) {
        return {
            name: "currency",
            variant: "crypto",
        };
    }
    if (englishNamesRegex.exec(value)) {
        return {
            name: "currency",
            variant: "english",
        };
    }
    if (symbolRegex.exec(value)) {
        return {
            name: "currency",
            variant: "symbol",
        };
    }
    return undefined;
}

const iso31663Regex = /^(?:(AFG|ALB|DZA|ASM|AND|AGO|AIA|ATA|ATG|ARG|ARM|ABW|AUS|AUT|AZE|BHS|BHR|BGD|BRB|BLR|BEL|BLZ|BEN|BMU|BTN|BOL|BES|BIH|BWA|BVT|BRA|IOT|BRN|BGR|BFA|BDI|CPV|KHM|CMR|CAN|CYM|CAF|TCD|CHL|CHN|CXR|CCK|COL|COM|COD|COG|COK|CRI|HRV|CUB|CUW|CYP|CZE|CIV|DNK|DJI|DMA|DOM|ECU|EGY|SLV|GNQ|ERI|EST|SWZ|ETH|FLK|FRO|FJI|FIN|FRA|GUF|PYF|ATF|GAB|GMB|GEO|DEU|GHA|GIB|GRC|GRL|GRD|GLP|GUM|GTM|GGY|GIN|GNB|GUY|HTI|HMD|VAT|HND|HKG|HUN|ISL|IND|IDN|IRN|IRQ|IRL|IMN|ISR|ITA|JAM|JPN|JEY|JOR|KAZ|KEN|KIR|PRK|KOR|KWT|KGZ|LAO|LVA|LBN|LSO|LBR|LBY|LIE|LTU|LUX|MAC|MDG|MWI|MYS|MDV|MLI|MLT|MHL|MTQ|MRT|MUS|MYT|MEX|FSM|MDA|MCO|MNG|MNE|MSR|MAR|MOZ|MMR|NAM|NRU|NPL|NLD|NCL|NZL|NIC|NER|NGA|NIU|NFK|MNP|NOR|OMN|PAK|PLW|PSE|PAN|PNG|PRY|PER|PHL|PCN|POL|PRT|PRI|QAT|MKD|ROU|RUS|RWA|REU|BLM|SHN|KNA|LCA|MAF|SPM|VCT|WSM|SMR|STP|SAU|SEN|SRB|SYC|SLE|SGP|SXM|SVK|SVN|SLB|SOM|ZAF|SGS|SSD|ESP|LKA|SDN|SUR|SJM|SWE|CHE|SYR|TWN|TJK|TZA|THA|TLS|TGO|TKL|TON|TTO|TUN|TUR|TKM|TCA|TUV|UGA|UKR|ARE|GBR|UMI|USA|URY|UZB|VUT|VEN|VNM|VGB|VIR|WLF|ESH|YEM|ZMB|ZWE|ALA))$/;
const iso31662Regex = /^(?:(AF|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|CV|KH|CM|CA|KY|CF|TD|CL|CN|CX|CC|CO|KM|CD|CG|CK|CR|HR|CU|CW|CY|CZ|CI|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|SZ|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|MK|RO|RU|RW|RE|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|UM|US|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW|AX))$/;
function inferCountry(value) {
    if (iso31663Regex.exec(value)) {
        return {
            name: "country",
            variant: "iso3166-3",
        };
    }
    if (iso31662Regex.exec(value)) {
        return {
            name: "country",
            variant: "iso3166-2",
        };
    }
    return undefined;
}

function inferTld(value) {
    const tldRegex = /^\.\w{2,14}(\.\w{2,14})*$/i;
    if (tldRegex.test(value)) {
        return {
            name: "tld",
        };
    }
    return undefined;
}

function inferIpAddress(value) {
    try {
        const ipv6 = new Address6(value);
        if (ipv6) {
            return {
                name: "ip",
                variant: "v6",
            };
        }
    }
    catch (error) {
        // Ignore
    }
    try {
        const ipv4 = new Address4(value);
        if (ipv4) {
            return {
                name: "ip",
                variant: "v4",
            };
        }
    }
    catch (error) {
        // Ignore
    }
    return undefined;
}

const iso693Regex = /^(?:(aa|ab|ae|af|ak|am|an|ar|as|av|ay|az|ba|be|bg|bi|bm|bn|bo|br|bs|ca|ce|ch|co|cr|cs|cu|cv|cy|da|de|dv|dz|ee|el|en|eo|es|et|eu|fa|ff|fi|fj|fo|fr|fy|ga|gd|gl|gn|gu|gv|ha|he|hi|ho|hr|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|io|is|it|iu|ja|jv|ka|kg|ki|kj|kk|kl|km|kn|ko|kr|ks|ku|kv|kw|ky|la|lb|lg|li|ln|lo|lt|lu|lv|mg|mh|mi|mk|ml|mn|mr|ms|mt|my|na|nb|nd|ne|ng|nl|nn|no|nr|nv|ny|oc|oj|om|or|os|pa|pi|pl|ps|pt|qu|rm|rn|ro|ru|rw|sa|sc|sd|se|sg|si|sk|sl|sm|sn|so|sq|sr|ss|st|su|sv|sw|ta|te|tg|th|ti|tk|tl|tn|to|tr|ts|tt|tw|ty|ug|uk|ur|uz|ve|vi|vo|wa|wo|xh|yi|yo|za|zh|zu))$/;
const iso6932Regex = /^(?:(aar|abk|ave|afr|aka|amh|arg|ara|asm|ava|aym|aze|bak|bel|bul|bis|bam|ben|bod|bre|bos|cat|che|cha|cos|cre|ces|chu|chv|cym|dan|deu|div|dzo|ewe|ell|eng|epo|spa|est|eus|fas|ful|fin|fij|fao|fra|fry|gle|gla|glg|grn|guj|glv|hau|heb|hin|hmo|hrv|hat|hun|hye|her|ina|ind|ile|ibo|iii|ipk|ido|isl|ita|iku|jpn|jav|kat|kon|kik|kua|kaz|kal|khm|kan|kor|kau|kas|kur|kom|cor|kir|lat|ltz|lug|lim|lin|lao|lit|lub|lav|mlg|mah|mri|mkd|mal|mon|mar|msa|mlt|mya|nau|nob|nde|nep|ndo|nld|nno|nor|nbl|nav|nya|oci|oji|orm|ori|oss|pan|pli|pol|pus|por|que|roh|run|ron|rus|kin|san|srd|snd|sme|sag|sin|slk|slv|smo|sna|som|sqi|srp|ssw|sot|sun|swe|swa|tam|tel|tgk|tha|tir|tuk|tgl|tsn|ton|tur|tso|tat|twi|tah|uig|ukr|urd|uzb|ven|vie|vol|wln|wol|xho|yid|yor|zha|zho|zul))$/;
const iso693EnglishNames = [
    "Catalan, Valencian",
    "Chichewa, Chewa, Nyanja",
    "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic",
    "Divehi, Dhivehi, Maldivian",
    "Dutch, Flemish",
    "Gaelic, Scottish Gaelic",
    "Greek, Modern (1453–)",
    "Haitian, Haitian Creole",
    "Interlingue, Occidental",
    "Kalaallisut, Greenlandic",
    "Kikuyu, Gikuyu",
    "Kirghiz, Kyrgyz",
    "Kuanyama, Kwanyama",
    "Limburgan, Limburger, Limburgish",
    "Luxembourgish, Letzeburgesch",
    "Navajo, Navaho",
    "Ossetian, Ossetic",
    "Pashto, Pushto",
    "Punjabi, Panjabi",
    "Romanian, Moldavian, Moldovan",
    "Sichuan Yi, Nuosu",
    "Sinhala, Sinhalese",
    "Spanish, Castilian",
    "Uighur, Uyghur",
    "Zhuang, Chuang",
    "Abkhazian",
    "Afar",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Aragonese",
    "Armenian",
    "Assamese",
    "Avaric",
    "Avestan",
    "Aymara",
    "Azerbaijani",
    "Bambara",
    "Bashkir",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bislama",
    "Bosnian",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Central Khmer",
    "Chamorro",
    "Chechen",
    "Chinese",
    "Chuvash",
    "Cornish",
    "Corsican",
    "Cree",
    "Croatian",
    "Czech",
    "Danish",
    "Dzongkha",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Faroese",
    "Fijian",
    "Finnish",
    "French",
    "Fulah",
    "Galician",
    "Ganda",
    "Georgian",
    "German",
    "Guarani",
    "Gujarati",
    "Hausa",
    "Hebrew",
    "Herero",
    "Hindi",
    "Hiri Motu",
    "Hungarian",
    "Icelandic",
    "Ido",
    "Igbo",
    "Indonesian",
    "Interlingua (International Auxiliary Language Association)",
    "Inuktitut",
    "Inupiaq",
    "Irish",
    "ISO language name",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kanuri",
    "Kashmiri",
    "Kazakh",
    "Kinyarwanda",
    "Komi",
    "Kongo",
    "Korean",
    "Kurdish",
    "Lao",
    "Latin",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Luba-Katanga",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Manx",
    "Maori",
    "Marathi",
    "Marshallese",
    "Mongolian",
    "Nauru",
    "Ndonga",
    "Nepali",
    "North Ndebele",
    "Northern Sami",
    "Norwegian",
    "Norwegian Bokmål",
    "Norwegian Nynorsk",
    "Occitan",
    "Ojibwa",
    "Oriya",
    "Oromo",
    "Pali",
    "Persian",
    "Polish",
    "Portuguese",
    "Quechua",
    "Romansh",
    "Rundi",
    "Russian",
    "Samoan",
    "Sango",
    "Sanskrit",
    "Sardinian",
    "Serbian",
    "Shona",
    "Sindhi",
    "Slovak",
    "Slovenian",
    "Somali",
    "South Ndebele",
    "Southern Sotho",
    "Sundanese",
    "Swahili",
    "Swati",
    "Swedish",
    "Tagalog",
    "Tahitian",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tonga (Tonga Islands)",
    "Tsonga",
    "Tswana",
    "Turkish",
    "Turkmen",
    "Twi",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Venda",
    "Vietnamese",
    "Volapük",
    "Walloon",
    "Welsh",
    "Western Frisian",
    "Wolof",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
];
const iso693NativeNames = [
    "(originally:) Occidental, (after WWII:) Interlingue",
    "azərbaycan dili, تۆرکجه",
    "Bahasa Melayu, بهاس ملايو‎",
    "català, valencià",
    "čeština, český jazyk",
    "chiCheŵa, chinyanja",
    "corsu, lingua corsa",
    "eesti, eesti keel",
    "euskara, euskera",
    "Fulfulde, Pulaar, Pular",
    "Gaelg, Gailck",
    "Iñupiaq, Iñupiatun",
    "język polski, polszczyzna",
    "kalaallisut, kalaallit oqaasii",
    "Kurdî, کوردی‎",
    "latine, lingua latina",
    "Nederlands, Vlaams",
    "occitan, lenga d'òc",
    "Oʻzbek, Ўзбек, أۇزبېك‎",
    "Română, Moldovenească",
    "Runa Simi, Kichwa",
    "Saɯ cueŋƅ, Saw cuengh",
    "slovenčina, slovenský jazyk",
    "Slovenski jezik, Slovenščina",
    "Soomaaliga, af Soomaali",
    "suomi, suomen kieli",
    "Türkmençe, Türkmen dili",
    "авар мацӀ, магӀарул мацӀ",
    "аҧсуа бызшәа, аҧсшәа",
    "Кыргызча, Кыргыз тили",
    "татар теле, tatar tele",
    "тоҷикӣ, toçikī, تاجیکی‎",
    "ئۇيغۇرچە‎, Uyghurche",
    "कॉशुर, کٲشُر‎",
    "पालि, पाळि",
    "संस्कृतम्, 𑌸𑌂𑌸𑍍𑌕𑍃𑌤𑌮𑍍",
    "सिंधी, سنڌي‎",
    "हिन्दी, हिंदी",
    "ਪੰਜਾਬੀ, پنجابی‎",
    "ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ",
    "ꦧꦱꦗꦮ, Basa Jawa",
    "中文 (Zhōngwén), 汉语, 漢語",
    "(Hausa) هَوُسَ",
    "Afaan Oromoo",
    "Afaraf",
    "Afrikaans",
    "Akan",
    "aragonés",
    "Asụsụ Igbo",
    "Avañe'ẽ",
    "avesta",
    "aymar aru",
    "Bahasa Indonesia",
    "bamanankan",
    "Basa Sunda",
    "Bislama",
    "bosanski jezik",
    "brezhoneg",
    "Chamoru",
    "chiShona",
    "Cymraeg",
    "dansk",
    "Davvisámegiella",
    "Deutsch",
    "Diné bizaad",
    "Dorerin Naoero",
    "English",
    "Español",
    "Esperanto",
    "Eʋegbe",
    "Faka Tonga",
    "fiteny malagasy",
    "føroyskt",
    "français",
    "Frysk",
    "Gaeilge",
    "gagana fa'a Samoa",
    "Gàidhlig",
    "Galego",
    "Gĩkũyũ",
    "Hiri Motu",
    "hrvatski jezik",
    "Ido",
    "Ikinyarwanda",
    "Ikirundi",
    "Interlingua",
    "isiNdebele",
    "isiNdebele",
    "isiXhosa",
    "isiZulu",
    "Íslenska",
    "Italiano",
    "Kajin M̧ajeļ",
    "Kanuri",
    "Kernewek",
    "Kikongo",
    "Kiluba",
    "Kiswahili",
    "Kreyòl ayisyen",
    "Kuanyama",
    "latviešu valoda",
    "Lëtzebuergesch",
    "lietuvių kalba",
    "Limburgs",
    "Lingála",
    "Luganda",
    "magyar",
    "Malti",
    "Norsk",
    "Norsk Bokmål",
    "Norsk Nynorsk",
    "Otjiherero",
    "Owambo",
    "Português",
    "Reo Tahiti",
    "Rumantsch Grischun",
    "sardu",
    "Sesotho",
    "Setswana",
    "Shqip",
    "SiSwati",
    "Svenska",
    "te reo Māori",
    "Tiếng Việt",
    "Tshivenḓa",
    "Türkçe",
    "Twi",
    "Volapük",
    "vosa Vakaviti",
    "Walon",
    "Wikang Tagalog",
    "Wollof",
    "Xitsonga",
    "yângâ tî sängö",
    "Yorùbá",
    "Ελληνικά",
    "башҡорт теле",
    "беларуская мова",
    "български език",
    "ирон ӕвзаг",
    "коми кыв",
    "қазақ тілі",
    "македонски јазик",
    "Монгол хэл",
    "нохчийн мотт",
    "русский",
    "српски језик",
    "Українська",
    "чӑваш чӗлхи",
    "ѩзыкъ словѣньскъ",
    "ქართული",
    "Հայերեն",
    "ትግርኛ",
    "አማርኛ",
    "नेपाली",
    "मराठी",
    "অসমীয়া",
    "বাংলা",
    "ગુજરાતી",
    "ଓଡ଼ିଆ",
    "தமிழ்",
    "తెలుగు",
    "ಕನ್ನಡ",
    "മലയാളം",
    "සිංහල",
    "ไทย",
    "ພາສາລາວ",
    "བོད་ཡིག",
    "རྫོང་ཁ",
    "ဗမာစာ",
    "ᐃᓄᒃᑎᑐᑦ",
    "ᐊᓂᔑᓈᐯᒧᐎᓐ",
    "ᓀᐦᐃᔭᐍᐏᐣ",
    "한국어",
    "ꆈꌠ꒿ Nuosuhxop",
    "日本語 (にほんご)",
];
function inferLanguage(value) {
    if (iso693Regex.test(value)) {
        return {
            name: "language",
            variant: "iso693-1",
        };
    }
    if (iso6932Regex.test(value)) {
        return {
            name: "language",
            variant: "iso693-2",
        };
    }
    if (iso693EnglishNames.includes(value)) {
        return {
            name: "language",
            variant: "english",
        };
    }
    if (iso693NativeNames.includes(value)) {
        return {
            name: "language",
            variant: "native",
        };
    }
    return undefined;
}

const phoneNumberRegex = /^\+[0-9]{6,15}$/;
function inferPhoneNumber(value) {
    const cleanedValue = value.replace(/[\s-()]/g, "");
    if (phoneNumberRegex.test(cleanedValue)) {
        return {
            name: "phoneNumber",
            variant: "e.164",
        };
    }
}

function lookupMimeType(ext) {
    if (ext === undefined) {
        return undefined;
    }
    const extensionToMimeType = {
        json: "application/json",
        js: "application/javascript",
        html: "text/html",
        css: "text/css",
        txt: "text/plain",
        ts: "text/typescript",
        tsx: "text/typescript",
        aac: "audio/aac",
        abw: "application/x-abiword",
        arc: "application/x-freearc",
        avi: "video/x-msvideo",
        azw: "application/vnd.amazon.ebook",
        bin: "application/octet-stream",
        bmp: "image/bmp",
        bz: "application/x-bzip",
        bz2: "application/x-bzip2",
        cda: "application/x-cdf",
        csh: "application/x-csh",
        csv: "text/csv",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        eot: "application/vnd.ms-fontobject",
        epub: "application/epub+zip",
        gz: "application/gzip",
        gif: "image/gif",
        htm: "text/html",
        ico: "image/vnd.microsoft.icon",
        ics: "text/calendar",
        jar: "application/java-archive",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        jsonld: "application/ld+json",
        mid: "audio/midi",
        midi: "audio/midi",
        mjs: "text/javascript",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        mpeg: "video/mpeg",
        mpkg: "application/vnd.apple.installer+xml",
        odp: "application/vnd.oasis.opendocument.presentation",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odt: "application/vnd.oasis.opendocument.text",
        oga: "audio/ogg",
        ogv: "video/ogg",
        ogx: "application/ogg",
        opus: "audio/opus",
        otf: "font/otf",
        png: "image/png",
        pdf: "application/pdf",
        php: "application/x-httpd-php",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        rar: "application/vnd.rar",
        rtf: "application/rtf",
        sh: "application/x-sh",
        svg: "image/svg+xml",
        swf: "application/x-shockwave-flash",
        tar: "application/x-tar",
        tif: "image/tiff",
        tiff: "image/tiff",
        ttf: "font/ttf",
        vsd: "application/vnd.visio",
        wav: "audio/wav",
        weba: "audio/webm",
        webm: "video/webm",
        webp: "image/webp",
        woff: "font/woff",
        woff2: "font/woff2",
        xhtml: "application/xhtml+xml",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xml: "application/xml",
        xul: "application/vnd.mozilla.xul+xml",
        zip: "application/zip",
        "3gp": "video/3gpp",
        "3g2": "video/3gpp2",
        "7z": "application/x-7z-compressed",
        md: "text/markdown",
    };
    return extensionToMimeType[ext];
}
const supportedProtocols = [
    "http:",
    "https:",
    "ftp:",
    "ftps:",
    "mailto:",
    "tel:",
    "sms:",
    "geo:",
    "file:",
    "ipfs:",
    "data:",
    "blob:",
    "chrome:",
    "chrome-extension:",
    "magnet:",
    "bitcoin:",
    "callto:",
    "dict:",
    "dns:",
    "feed:",
    "git:",
    "gtalk:",
    "imap:",
    "im:",
    "info:",
    "irc:",
    "ircs:",
    "irc6:",
    "itms:",
    "jabber:",
    "ldap:",
    "ldaps:",
    "maps:",
    "nfs:",
    "payto:",
    "proxy:",
    "redis:",
    "s3:",
    "ssh:",
    "udp:",
    "view-source:",
    "ws:",
    "wss:",
    "xmpp:",
];
function inferUri(value) {
    try {
        const url = new URL(value);
        if (url.hostname === "" && !supportedProtocols.includes(url.protocol)) {
            return undefined;
        }
        // Get mimetype from extension
        const ext = url.pathname.split(".").pop();
        const mimeType = lookupMimeType(ext);
        return {
            name: "uri",
            contentType: mimeType ? mimeType : undefined,
        };
    }
    catch (_) {
        // Ignore
    }
    return undefined;
}

function validateVersion(uuid, versionNumber) {
    return validate(uuid) && version(uuid) === versionNumber;
}
function inferUuid(value) {
    if (validateVersion(value, 1)) {
        return {
            name: "uuid",
            variant: "v1",
        };
    }
    if (validateVersion(value, 4)) {
        return {
            name: "uuid",
            variant: "v4",
        };
    }
    if (validateVersion(value, 5)) {
        return {
            name: "uuid",
            variant: "v5",
        };
    }
    return undefined;
}

function inferFilesize(value) {
    if (value.match(/^[0-9.]+\s?(?:(B|MB|K|GB|TB|PB|MiB|KB|kB))$/)) {
        return {
            name: "filesize",
            variant: "human",
        };
    }
    return undefined;
}

const tlds = [
    "com",
    "org",
    "net",
    "edu",
    "gov",
    "mil",
    "co",
    "io",
    "ac",
    "dev",
    "info",
    "biz",
    "name",
    "uk",
    "me",
    "ca",
    "tv",
    "ir",
    "au",
];
function containsTld(value) {
    const extname = value.split(".").pop();
    if (!extname) {
        return false;
    }
    return tlds.includes(extname);
}
function isValidHostname(value, allowUnderscore = false) {
    if (value.length === 0) {
        return false;
    }
    if (value === "localhost") {
        return true;
    }
    if (!value.includes(".")) {
        return false;
    }
    const validHostnameChars = new RegExp(`^[a-zA-Z0-9-.${allowUnderscore ? "_" : ""}]{1,253}.?$`, "g");
    if (!validHostnameChars.test(value)) {
        return false;
    }
    if (value.endsWith(".")) {
        value = value.slice(0, value.length - 1);
    }
    const labels = value.split(".");
    const isValid = labels.every(function (label) {
        const validLabelChars = new RegExp(`^([a-zA-Z0-9-${allowUnderscore ? "_" : ""}]+)$`, "g");
        const validLabel = validLabelChars.test(label) &&
            label.length < 64 &&
            !label.startsWith("-") &&
            !label.endsWith("-");
        return validLabel;
    });
    return isValid && containsTld(value);
}
function inferHostname(value) {
    if (isValidHostname(value)) {
        return {
            name: "hostname",
            variant: "rfc1123",
        };
    }
    if (isValidHostname(value, true)) {
        return {
            name: "hostname",
            variant: "rfc5890",
        };
    }
    return undefined;
}

function inferJson(value) {
    try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "object") {
            return {
                name: "json",
                variant: "ecma262",
            };
        }
    }
    catch {
        // Ignore
    }
    try {
        const parsedValue = JSON5.parse(value);
        if (typeof parsedValue === "object") {
            return {
                name: "json",
                variant: "json5",
            };
        }
    }
    catch {
        // Ignore
    }
    return undefined;
}

const rfc6901Regex = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
function inferJsonPointer(value) {
    if (rfc6901Regex.exec(value)) {
        return { name: "jsonPointer", variant: "rfc6901" };
    }
    return undefined;
}

const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Emoji_Modifier_Base})*$/u;
function inferEmoji(value) {
    if (emojiRegex.test(value)) {
        return {
            name: "emoji",
        };
    }
    return undefined;
}

const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
function inferSemver(value) {
    if (regex.test(value)) {
        return { name: "semver" };
    }
    return undefined;
}

function isFirestoreTimestamp(value) {
    return (typeof value === "object" &&
        value !== null &&
        typeof value._seconds === "number" &&
        typeof value._nanoseconds === "number");
}
function inferFirestoreTimestamp(value) {
    if (isFirestoreTimestamp(value)) {
        return {
            name: "firestoreTimestamp",
        };
    }
    return undefined;
}

function inferJWT(value) {
    try {
        const token = jwtDecode(value);
        if (token) {
            return {
                name: "jwt",
            };
        }
    }
    catch {
        // ignore
    }
    return undefined;
}

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const rgbRegex = /^rgba?\((\d{1,3})(,|\s+)\s*(\d{1,3})(,|\s+)\s*(\d{1,3})(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;
const hslRegex = /^hsla?\((\d{1,3})(,|\s+)\s*(\d{1,3}%)(,|\s+)\s*(\d{1,3}%)(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;
function inferColor(value) {
    if (hexRegex.test(value)) {
        return {
            name: "color",
            variant: "hex",
        };
    }
    if (rgbRegex.test(value)) {
        return {
            name: "color",
            variant: "rgb",
        };
    }
    if (hslRegex.test(value)) {
        return {
            name: "color",
            variant: "hsl",
        };
    }
    return undefined;
}

const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
const amexRegex = /^3[47][0-9]{13}$/;
const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
const masterCardRegex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
const dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
function inferCreditCard(value) {
    const withoutWhitespace = value.replace(/\s/g, "");
    if (visaRegex.test(withoutWhitespace)) {
        return {
            name: "creditcard",
            variant: "visa",
        };
    }
    else if (amexRegex.test(withoutWhitespace)) {
        return {
            name: "creditcard",
            variant: "amex",
        };
    }
    else if (discoverRegex.test(withoutWhitespace)) {
        return {
            name: "creditcard",
            variant: "discover",
        };
    }
    else if (masterCardRegex.test(withoutWhitespace)) {
        return {
            name: "creditcard",
            variant: "mastercard",
        };
    }
    else if (dinersClubRegex.test(withoutWhitespace)) {
        return {
            name: "creditcard",
            variant: "dinersclub",
        };
    }
    return undefined;
}

// This is the order the formats will be run in
const formats = [
    inferUri,
    inferTld,
    inferHostname,
    inferEmail,
    inferDatetime,
    inferIpAddress,
    inferPhoneNumber,
    inferCurrency,
    inferCountry,
    inferLanguage,
    inferUuid,
    inferFilesize,
    inferTimestamp,
    inferJson,
    inferJsonPointer,
    inferEmoji,
    inferSemver,
    inferJWT,
    inferColor,
    inferCreditCard,
];
function inferFormat(value) {
    if (value.trim() === "") {
        return undefined;
    }
    for (const [, format] of Object.entries(formats)) {
        const result = format(value);
        if (result) {
            return result;
        }
    }
    return undefined;
}
const objectFormats = [inferFirestoreTimestamp];
function inferObjectFormat(value) {
    for (const [, format] of Object.entries(objectFormats)) {
        const result = format(value);
        if (result) {
            return result;
        }
    }
    return undefined;
}
const intFormats = [inferTimestamp];
function inferIntFormat(value) {
    for (const [, format] of Object.entries(intFormats)) {
        const result = format(value);
        if (result) {
            return result;
        }
    }
    return undefined;
}

function inferType(value) {
    if (value == null) {
        return { name: "null", value: null };
    }
    if (typeof value === "boolean") {
        return { name: "bool", value };
    }
    if (typeof value === "number") {
        if (Number.isInteger(value)) {
            return {
                name: "int",
                value,
                format: inferIntFormat(value),
            };
        }
        else {
            return { name: "float", value };
        }
    }
    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return {
                name: "array",
                value,
            };
        }
        return {
            name: "object",
            format: inferObjectFormat(value),
            value,
        };
    }
    if (typeof value === "string") {
        return {
            name: "string",
            value,
            format: inferFormat(value),
        };
    }
    return { name: "null", value: null };
}

export { inferType };
