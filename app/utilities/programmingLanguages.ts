import { PathComponent } from "@jsonhero/path"

export enum languages {
    javascript = "javascript",
    python = "python"
}

export const canUseOptChaining = {
    [languages.javascript]: true,
    [languages.python]: false,
}

export const defaultLangauge = languages.javascript

export const getPathValue = (language: languages, variableName: string, useOptChaining: boolean, paths: PathComponent[]): string => {
    const path_base = variableName
    switch(language) {
        case languages.python:
            return `${path_base}${paths.slice(1).map(p => p.isArray ? `[${p.toString()}]` : `["${p.toString()}"]`).join("")}`
        case languages.javascript:
        default:
            return `${path_base}${paths.slice(1).map(p => p.isArray ? `${useOptChaining ? "?[" : "["}${p.toString()}]` : `${useOptChaining ? "?." : "."}${p.toString()}`).join("")}`
    }
}

