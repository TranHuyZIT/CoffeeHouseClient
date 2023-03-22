enum Gender {
    Nam = 'MALE',
    Nữ = 'FEMALE',
}
export default Gender;
export function convertGenderValueToKey(value: any) {
    return Object.keys(Gender)[Object.values(Gender).indexOf(value)];
}
