export function makeRegisterName(listPosition: number | undefined, name: string, basePath?: string) {
    return listPosition !== undefined ? basePath ? `${basePath}[${listPosition}].${name}` : `${name}[${listPosition}]` : name
}