
/**
 * {key:value}の形をしているObjectを{key_name:key,...value}に変換
 */
export const KeyObjToList = (keyObj: Object, key_name: string) => {
    const KV: [string, Object][] = Object.entries(keyObj);
    return KV.map(([key, content]) => {
        const tmp = { ...content };
        Object.defineProperty(tmp, key_name, { value: key })
        return tmp
    })
}

