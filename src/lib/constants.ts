import { feeling } from "./types"

export const PLEASANT_ENEGY_LABELS = ["わくわく", "楽しい", "嬉しい"]
export const UNPLEASANT_ENEGY_LABELS = ["ストレス", "緊張", "いらいら"]
export const UNPLEASANT_UNENEGY_LABELS = ["疲れた", "退屈", "うんざり"]
export const PLEASANT_UNENEGY_LABELS = ["リラックス", "落ち着いている", "癒し"]

export const getFeelingLabels = (feeling:feeling) => {
    if(feeling.energy>=6){
        if(feeling.pleasantness>=6){
            return PLEASANT_ENEGY_LABELS
        }else{
            return UNPLEASANT_ENEGY_LABELS
        }
    }else{
        if(feeling.pleasantness>=6){
            return PLEASANT_UNENEGY_LABELS
        }else{
            return UNPLEASANT_UNENEGY_LABELS
        }
    }
}