import { feeling } from "./types"

/**
 * 小数点以下切り捨て
 * @param ms ミリ秒
 * @returns 
 */
export const msToHMS = (ms: number) => {
    const second_sum = Math.floor(ms / 1000)
    return {
        hour: Math.floor(second_sum / 3600),
        minute: Math.floor(second_sum / 60)%60,
        second: second_sum % 60,
    }
}

/**
 * formでstringで入力を処理しなければならない時(radio)などに使う
 * @param pe pleasantness-energyの略
 * @returns 
 */
export const peToNum = ( pe : "p-e" | "up-e" | "p-ue" | "up-ue" ):feeling => {
    if(pe==="p-e"){
        return {pleasantness:10,energy:10,is_related_with_task:null}
    }else if (pe==="up-e"){
        return {pleasantness:1,energy:10,is_related_with_task:null}
    }else if (pe==="p-ue"){
        return {pleasantness:10,energy:1,is_related_with_task:null}
    }else{
        return {pleasantness:1,energy:1,is_related_with_task:null}
    }
}