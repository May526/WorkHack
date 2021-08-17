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