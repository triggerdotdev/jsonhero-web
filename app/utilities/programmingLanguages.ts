import { PathComponent } from "@jsonhero/path"

export const enum languages {
    javascript = "javascript",
    python = "python"
}

export const get_path_value = (language: languages, paths: PathComponent[]): string => {
    switch(language) {
        case languages.python:
            return paths.slice(1).map(p => p.isArray ? `[${p.toString()}]` : `["${p.toString()}"]`).join("")
        case languages.javascript:
        default:
            return paths.slice(1).map(p => p.isArray ? `[${p.toString()}]` : `.${p.toString()}`).join("")
    }
}