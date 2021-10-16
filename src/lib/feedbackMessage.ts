import { getFeelingLabels } from './constants';
import { peToNum } from './convertTypes';
import { computeFeelingRatios, getDayEndTimestamp, getDayStartTimestamp } from './no_category';
import { feeling } from './types';
export const getGreeting = () => {
    return "今日もお疲れ様です。"
}

export const getYesterdayReviewMessage = (feelings:[feeling,number][]) => {
    const feeling_order:("p-e"|"up-e"|"up-ue"|"p-ue")[] = ["p-e","up-e","up-ue","p-ue"];
    const yesterday_feelings = feelings.filter(([,timestamp])=>{
        const yesterday_timestamp = new Date(Date.now()-1000*60*60*24);
        const yesterday_latest = getDayEndTimestamp(yesterday_timestamp).getTime();
        const yesterday_old = getDayStartTimestamp(yesterday_timestamp).getTime();
        return (yesterday_old<= timestamp) && (timestamp <= yesterday_latest);
    });
    const feeling_ratios = computeFeelingRatios(yesterday_feelings,0,24).map((ratio)=>Math.round(ratio*100));

    // 感情のどの種類も35%を超えていないとき
    if(Math.max(...feeling_ratios) <= 35){
        return "昨日は穏やかだったようですね。"
    }

    const feeling_names = feeling_ratios.map((ratio,i)=>{
        if(ratio>35){
            return "「"+getFeelingLabels(peToNum(feeling_order[i])).join("/")+"」"
        }else{
            return ""
        }
    }).filter((str)=>{
        if(!(str==="")){
            return true
        }else{
            return false
        }
    });

    let message = "";
    message+= "昨日は"
    message+= feeling_names.join(",")
    message+= "の感情がおおかったようですね"
    return message

}

export const getDailyReviewMessage = () => {
    return "最近、朝にイライラ/緊張/ストレスを感じることが多いようです。"
}

export const getActionRecommendTopMessage = () => {
    return "朝にイライラ/緊張/ストレスを感じるときは、以下の行動をしてみてはいかがでしょう？"
}

export const getRecommendedActionsMessages = () => {
    return ["深呼吸してみましょう","深呼吸してみましょう"]
}

export const getEndingMessage = () => {
    return "少しの行動で気持ちは前向きになっていきますよ。"
}