export class ObjectUtil {

    public static isAnyEmpty(strs: any[]): boolean {
        return strs.some(s => this.isEmpty(s));
    }
    
    public static isEmpty(str: any): boolean {
        if(typeof str === 'undefined') {
            return true;
        }
        if (typeof str === 'string') {
            return str === '';
        }
        return false;
    }


}