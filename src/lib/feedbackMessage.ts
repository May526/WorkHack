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
            return "「"+getFeelingLabels(peToNum(feeling_order[i])).join(",")+"」"
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

export const getDailyReviewMessage = (feelings:[feeling,number][]) => {
    
    //複数最大値があった場合の表示が面倒くさい
    const feeling_names = computeMaximumFeeling(feelings)[0];
    const feeling_time = computeMaximumFeeling(feelings)[1];

    let message = "";
    message+= "最近"
    message+= feeling_time
    message+= "に"
    message+= feeling_names
    message+= "を感じる事が多いようです"
    return message
}

export const getActionRecommendTopMessage = (feelings:[feeling,number][]) => {

    const feeling_names = computeMaximumFeeling(feelings)[0];
    
    let message = "";
    message+= feeling_names;
    message+= "を感じるときは、以下の行動をしてみてはいかがでしょう？"
    return message
}

export const getRecommendedActionsMessages = (feelings:[feeling,number][]) => {
    const feeling_order:("p-e"|"up-e"|"up-ue"|"p-ue")[] = ["p-e","up-e","up-ue","p-ue"];
    const feeling_names = computeMaximumFeeling(feelings)[0];
    switch(feeling_names){
        case getFeelingLabels(peToNum(feeling_order[0])):
            return "何か難しいことに挑戦してみる";
            break;
        case getFeelingLabels(peToNum(feeling_order[1])):
            return "深呼吸してみる";
            break;
        case getFeelingLabels(peToNum(feeling_order[2])):
            return "好きな曲を聞いてみる";
            break;
        case getFeelingLabels(peToNum(feeling_order[3])):
            return "軽い運動をしてみる";
            break;
    }
}

export const getEndingMessage = () => {
    return "少しの行動で気持ちは前向きになっていきますよ。"
}

export const computeMaximumFeeling = (feelings:[feeling,number][]) => {
    const feeling_order:("p-e"|"up-e"|"up-ue"|"p-ue")[] = ["p-e","up-e","up-ue","p-ue"];
    
    //1週間の日毎の割合を出す
    const recent_feelings = new Array(7);
    const feeling_ratios_morning = new Array(7);
    const feeling_ratios_noon = new Array(7);
    const feeling_ratios_night = new Array(7);
    for(let i=0;i<7;i++){
        recent_feelings[i] = feelings.filter(([,timestamp])=>{
            const day_timestamp = new Date(Date.now()-1000*60*60*24*i);
            const recent_latest = getDayEndTimestamp(day_timestamp).getTime();
            const recent_old = getDayStartTimestamp(day_timestamp).getTime();
            return (recent_old<= timestamp) && (timestamp <= recent_latest);
        });
        //feeling_ratiosに7日分入れていく        
        feeling_ratios_morning[i] = computeFeelingRatios(recent_feelings[i],0,8).map((ratio)=>Math.round(ratio*100));
        feeling_ratios_noon[i] = computeFeelingRatios(recent_feelings[i],8,16).map((ratio)=>Math.round(ratio*100));
        feeling_ratios_night[i] = computeFeelingRatios(recent_feelings[i],16,24).map((ratio)=>Math.round(ratio*100));
    }
    
    //↑３つの最大値を取ってくる
    //const feeling_ratios = Math.max(...feeling_ratios_morning,...feeling_ratios_noon,...feeling_ratios_night);
    
    //過去1週間の重みづけ
    //21timezone(朝昼夜の7日分)×4感情の二次元配列を作成
    const feeling_ratios = [feeling_ratios_morning,feeling_ratios_noon,feeling_ratios_night];
    var oneweekFeeling = new Array(21);
    for (let i = 0; i < oneweekFeeling.length; i++){
	    oneweekFeeling[i] = new Array(4);
    }
    //jが時間帯でkが4感情
    for(let j=0;j<21;j++){
        for(let k=0;k<4;k++){
            //j%3で朝か昼か夜か
            //j/3で何日前か
            //kでどの感情か
            //j/3+1で〇日前だと1/〇される
            oneweekFeeling[j][k]=(feeling_ratios[j%3][Math.floor(j/3)][k])/(j/3+1)
        }
    }
    //oneweekFeelingを時間帯ごとに合計して、3*4の行列になるようにする→array_rntにぶち込む
    var weightedFeeling_ratios = (new Array(3)).fill(0);
    for (let i = 0; i < weightedFeeling_ratios.length; i++){
	    weightedFeeling_ratios[i] = (new Array(4)).fill(0);
    }
    for(let k=0;k<4;k++){
        for(let j=0;j<21;j++){
            weightedFeeling_ratios[j%3][k]+=oneweekFeeling[j][k]
        }
    }
    console.log(weightedFeeling_ratios);
    //最大値を取る時間帯名を取ってくる
    //最大値を取る感情名を取ってくる
    var array_time = ["朝","昼","夜"];
    //12この配列にする
    var array_rnt = new Array(12);
    for(let i=0;i<3;i++){
        for(let j=0;j<4;j++){
            array_rnt.push({time:array_time[i],name:getFeelingLabels(peToNum(feeling_order[j])),ratio:weightedFeeling_ratios[i][j]})
        }
    }
    const feeling_names = array_rnt.sort((a, b) => b.ratio - a.ratio)[0].name;
    const feeling_time = array_rnt.sort((a, b) => b.ratio - a.ratio)[0].time;
    return [feeling_names,feeling_time]
}