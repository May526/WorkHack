import { feeling } from "./types"

export const PLEASANT_ENEGY_LABELS = ["わくわく", "楽しい", "嬉しい"]
export const UNPLEASANT_ENEGY_LABELS = ["ストレス", "緊張", "いらいら"]
export const UNPLEASANT_UNENEGY_LABELS = ["疲れた", "退屈", "うんざり"]
export const PLEASANT_UNENEGY_LABELS = ["リラックス", "落ち着いている", "癒し"]

export const PLEASANT_ENEGY_COLOR = "#fde9d1"
export const UNPLEASANT_ENEGY_COLOR = "#f5cfce"
export const UNPLEASANT_UNENEGY_COLOR = "#c6eff5"
export const PLEASANT_UNENEGY_COLOR = "#e6f2da"

/**
 * feelingの値からrgbのcolorコードを取得する
 * @param feeling 
 * @returns "#xxyyzz"の形をしたrgb-string
 */
 export const getColorByFeeling = (feeling: feeling) => {
    if (feeling.energy < 5) {
        if (feeling.pleasantness < 5) {
            return UNPLEASANT_UNENEGY_COLOR
        } else {
            return PLEASANT_UNENEGY_COLOR
        }
    } else {
        if (feeling.pleasantness < 5) {
            return UNPLEASANT_ENEGY_COLOR
        } else {
            return PLEASANT_ENEGY_COLOR
        }
    }
}

export const getFeelingLabels = (feeling: feeling) => {
    if (feeling.energy >= 6) {
        if (feeling.pleasantness >= 6) {
            return PLEASANT_ENEGY_LABELS
        } else {
            return UNPLEASANT_ENEGY_LABELS
        }
    } else {
        if (feeling.pleasantness >= 6) {
            return PLEASANT_UNENEGY_LABELS
        } else {
            return UNPLEASANT_UNENEGY_LABELS
        }
    }
}

// pleasant:positive, unpleasant:negativeで対応
// pleasantは一定領域内にいることが理想なのでlower limitがある
// energyは曲線上にいることが理想なのでlimitがない
/**
 * [unpleasant,pleasant]
 */
const UNPLEASANT_PLEASANT_IDEAL_RATIO_LOWER_LIMIT = [1, 3]
const UNPLEASANT_PLEASANT_IDEAL_RATIO_UPPER_LIMIT = [0, 1]
/**
 * [unenergy,energy]
 */
const UNENRGY_ENERGY_IDEAL_RATIO = [1, 1]

//TODO: リファクタリング
/**
 * 百分率で4象限の割合を返す
 * 右上から左回りの順(pleasant,enegy),(up,e),(up,ue),(p,ue)の順
 * @returns 
 */
export const getPleasantEnegyRatio = (limit: "lower" | "upper") => {
    const y = UNENRGY_ENERGY_IDEAL_RATIO[0]
    const x = UNENRGY_ENERGY_IDEAL_RATIO[1]

    const pleasant_ratio_limit = limit === "lower" ? UNPLEASANT_PLEASANT_IDEAL_RATIO_LOWER_LIMIT : UNPLEASANT_PLEASANT_IDEAL_RATIO_UPPER_LIMIT
    const a = pleasant_ratio_limit[0]
    const b = pleasant_ratio_limit[1]

    return [b * x, a * x, a * y, b * y].map((numerator) => Math.round(100 * numerator / ((a + b) * (x + y))))
}

export const getIdealEmotionRatioArea = () => {
    const lower = getPleasantEnegyRatio("lower")
    const upper = getPleasantEnegyRatio("upper")
    if (lower.length !== upper.length) {
        alert("ERROR:Ideal ratio is invalid")
        return
    }
    return lower.map((ratio, i) => lower[i] < upper[i] ? [lower[i], upper[i]] : [upper[i], lower[i]])
}
