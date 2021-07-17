
export const USERNAME_FIELD_NAME = "username";

export class LocalStorage {
    public static getFromLocalStorage(fieldName: string): string | null {
        return window.localStorage.getItem(fieldName);
    }

    public static setToLocalStorage(fielName: string, fieldValue: string) {
        window.localStorage.setItem(fielName, fieldValue);
    }
}