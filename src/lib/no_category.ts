import { feeling, task } from "./types";


/**
 * (energy,plesantness)を2次元ベクトル値だと思って
 * 差のユークリッド距離についてtask1>task2なら1,そうでないなら-1
 * ユークリッド距離が等しい場合は
 * beforeの方のユークリッド距離でtask1>task2なら1,そうでないなら-1
 * さらに等しい場合は等しい扱い
 */
export const compareTasksOnFeeling = (task1: task, task2: task) => {
    function norm(vector: number[]) {
        let ret = 0;
        for (let i = 0; i < vector.length; i++) {
            ret += vector[i] ** 2;
        }
        return ret;
    }

    function diff(vector1: number[], vector2: number[]) {
        let ret = [];
        for (let i = 0; i < vector1.length; i++) {
            ret.push(vector1[i] - vector2[i]);
        }

        return ret;
    }
    const t1_before = [
        task1.feelings.before.energy,
        task1.feelings.before.pleasantness,
    ];
    const t1_after = [
        task1.feelings.after.energy,
        task1.feelings.after.pleasantness,
    ];
    const t2_before = [
        task2.feelings.before.energy,
        task2.feelings.before.pleasantness,
    ];
    const t2_after = [
        task2.feelings.after.energy,
        task2.feelings.after.pleasantness,
    ];
    const t1_diff_norm = norm(diff(t1_after, t1_before));
    const t2_diff_norm = norm(diff(t2_after, t2_before));
    if (t1_diff_norm > t2_diff_norm) {
        return -1;
    } else if (t1_diff_norm < t2_diff_norm) {
        return 1;
    } else {
        if (norm(t1_before) > norm(t2_before)) {
            return -1;
        } else {
            return 1;
        }
    }
}

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