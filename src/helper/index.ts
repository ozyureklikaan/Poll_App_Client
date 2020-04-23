export function getModelYears() {
    let years = [];
    const year = new Date().getFullYear() + 1;

    for (let counter = year; counter > year - 50; counter--) {
        years.push(counter.toString());
    }

    return years;
}

export function getUser() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}