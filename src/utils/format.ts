export function formatMoney(n: number) {
    return n
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        .replace('.0', '');
}

export function calcPercent(a: number, b: number) {
    const percent = Math.round(((b - a) / b) * 100);
    return `${percent}%`;
}
