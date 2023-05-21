export function formatMoney(n: number) {
    return n
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        .replace('.0', '');
}

export function formatMoneyStr(n: number) {
    if (n < 1000000) {
        return `${n / 1000.0}K`;
    } else if (1000000 <= n && n <= 100000000) {
        return `${(n / 1000000.0).toFixed(2)}M`;
    }
}

export function formatDate(date: string) {
    const newDate = new Date(date);

    return `${newDate.getHours()}:${newDate.getMinutes()}  ${newDate.getDate()}-${
        newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
}

export function calcPercent(a: number, b: number) {
    const percent = Math.round(((b - a) / b) * 100);
    return `${percent}%`;
}
