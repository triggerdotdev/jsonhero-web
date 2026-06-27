import { JSONValueType } from "./@types";
export { JSONValueType };
export { JSONStringFormat, JSONObjectFormat, JSONHostnameFormat, JSONUUIDFormat, JSONURIFormat, JSONPhoneNumberFormat, JSONLanguageFormat, JSONIPAddressFormat, JSONTLDFormat, JSONCountryFormat, JSONCurrencyFormat, JSONEmailFormat, JSONTimestampFormat, JSONDateTimeFormat, JSONFilesizeFormat, JSONJSONFormat, JSONJSONPointerFormat, JSONEmojiFormat, JSONSemverFormat, JSONJWTStringFormat, } from "./formats";
export { JSONNullType, JSONBoolType, JSONFloatType, JSONIntType, JSONStringType, JSONObjectType, JSONArrayType, } from "./@types";
export declare function inferType(value: unknown): JSONValueType;
