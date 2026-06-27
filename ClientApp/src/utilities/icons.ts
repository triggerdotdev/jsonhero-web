import {
  CubeIcon,
  CollectionIcon,
  EyeOffIcon,
  CheckCircleIcon,
  AnnotationIcon,
  CalendarIcon,
  AtSymbolIcon,
  GlobeAltIcon,
  PhotographIcon,
  CodeIcon,
  PhoneIcon,
  DocumentIcon,
  ColorSwatchIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ClockIcon,
  GlobeIcon,
  EmojiHappyIcon,
  ChatAlt2Icon,
  ArchiveIcon,
  IdentificationIcon,
  KeyIcon,
  DocumentTextIcon,
  HashtagIcon,
} from "@heroicons/react/outline";
import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { StringIcon } from "~/components/Icons/StringIcon";
import { IconComponent } from "~/useColumnView";

export function iconForValue(value: unknown): IconComponent {
  return iconForType(inferType(value));
}

export function iconForType(type: JSONValueType): IconComponent {
  switch (type.name) {
    case "object": {
      return CubeIcon;
    }
    case "array": {
      return CollectionIcon;
    }
    case "null": {
      return EyeOffIcon;
    }
    case "bool": {
      return CheckCircleIcon;
    }
    case "int": {
      if (type.format == null) {
        return HashtagIcon;
      }
      switch (type.format.name) {
        case "timestamp": {
          return CalendarIcon;
        }
        default: {
          return HashtagIcon;
        }
      }
    }
    case "float": {
      return HashtagIcon;
    }
    case "string": {
      if (type.format == null) {
        return StringIcon;
      }

      switch (type.format.name) {
        case "timestamp": {
          return CalendarIcon;
        }
        case "datetime": {
          switch (type.format.parts) {
            case "time":
              return ClockIcon;
          }
          return ClockIcon;
        }
        case "email": {
          return AtSymbolIcon;
        }
        case "hostname":
        case "tld":
        case "ip":
          return GlobeAltIcon;
        case "uri": {
          switch (type.format.contentType) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
            case "image/webm":
              return PhotographIcon;
            case "application/json":
              return CodeIcon;
            default:
              return GlobeAltIcon;
          }
        }
        case "phoneNumber": {
          return PhoneIcon;
        }
        case "currency": {
          return CurrencyDollarIcon;
        }
        case "country": {
          return GlobeIcon;
        }
        case "emoji": {
          return EmojiHappyIcon;
        }
        case "color": {
          return ColorSwatchIcon;
        }
        case "language": {
          return ChatAlt2Icon;
        }
        case "filesize": {
          return ArchiveIcon;
        }
        case "uuid": {
          return IdentificationIcon;
        }
        case "json":
        case "jsonPointer": {
          return CodeIcon;
        }
        case "jwt": {
          return KeyIcon;
        }
        case "semver": {
          return DocumentTextIcon;
        }
        case "creditcard": {
          switch (type.format.variant) {
            case "visa": {
              return CreditCardIcon;
            }
            case "mastercard": {
              return CreditCardIcon;
            }
            case "amex": {
              return CreditCardIcon;
            }
            case "discover": {
              return CreditCardIcon;
            }
            case "dinersclub": {
              return CreditCardIcon;
            }
            default: {
              return CreditCardIcon;
            }
          }
        }
        default: {
          return AnnotationIcon;
        }
      }
    }
    default: {
      return DocumentIcon;
    }
  }
}
