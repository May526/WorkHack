import { feeling } from "./types";


/**
 * feelingの値からrgbのcolorコードを取得する
 * @param feeling 
 * @returns "#xxyyzz"の形をしたrgb-string
 */
export const getColorByFeeling = (feeling:feeling) => {
    if(feeling.energy<5){
        if(feeling.pleasantness<5){
            return "#c6eff5"
        }else{
            return "#e6f2da"
        }
    }else{
        if(feeling.pleasantness<5){
            return "#f5cfce"
        }else{
            return "#fde9d1"
        }
    }
}