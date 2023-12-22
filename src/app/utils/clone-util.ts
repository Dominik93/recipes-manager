export class CloneUtil {

    public static clone(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

}