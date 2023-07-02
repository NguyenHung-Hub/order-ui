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
    const h = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
    const mi = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
    const d = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const mo = newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    const y = newDate.getFullYear() < 10 ? `0${newDate.getFullYear()}` : newDate.getFullYear();

    return `${h}:${mi}  ${d}-${mo}-${y}`;
}

export function calcPercent(a: number, b: number) {
    const percent = Math.round(((b - a) / b) * 100);
    return `${percent}%`;
}
