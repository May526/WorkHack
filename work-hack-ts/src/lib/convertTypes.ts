
/**
 * 
 */
/**
 * {key:value}の形をしているObjectを{key_name:key,...value}に変換
 * @param keyObj 
 * @param key_name 
 * @returns 
 */
export const KeyObjToList = (keyObj: Object, key_name: string) => {
    const KV: [string, Object][] = Object.entries(keyObj);
    return KV.map(([key, content]) => {
        const tmp = { ...content };
        Object.defineProperty(tmp, key_name, { value: key })
        return tmp
    })
}

/**
 * 小数点以下切り捨て
 * @param ms ミリ秒
 */
export const msToHMS = (ms: number) => {
    const second_sum = Math.floor(ms / 1000)
    return {
        hour: Math.floor(second_sum / 3600),
        minute: Math.floor(second_sum / 60)%60,
        second: second_sum % 60,
    }
}