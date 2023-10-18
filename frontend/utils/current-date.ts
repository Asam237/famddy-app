const joinDate = (date: any, options: any, separator: any) => {
    const format = (option: any) => {
        let formatter = new Intl.DateTimeFormat('en', option);
        return formatter.format(date);
    }

    return options.map(format).join(separator);
}

let options = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];

export const joined = (date: Date) => {
    return joinDate(date, options, '-')
}