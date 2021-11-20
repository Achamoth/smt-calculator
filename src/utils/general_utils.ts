export function objectToArray(object: any): any[] {
    let result: any[] = [];
    for (const property in object) {
        result.push(object[property]);
    }
    return result;
}