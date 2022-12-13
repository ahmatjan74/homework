export const formatNumberAndFix2 = (num: number) => {
    let bigger = num * 1000;
    let digits = bigger % 10;
    if (digits >= 5) {
        bigger += 10;
    }
    return Number(((bigger - digits) / 1000).toFixed(2));
}