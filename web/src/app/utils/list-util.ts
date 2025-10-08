export class ListUtil {

    public static replace(list: any[], finder: (item: any) => void, replacement: any): any[] {
        const index = ListUtil.findIndex(list, item => finder(item));
        list[index] = replacement;
        return list;
    }

    public static deleteIf(list: any[], finder: (item: any) => void): any[] {
        const index = ListUtil.findIndex(list, item => finder(item));
        list.splice(index, 1);
        return list;
    }

    public static findIndex(list: any[], finder: (item: any) => void, message: string = 'No such element.'): number {
        const index = list.findIndex(item => finder(item))
        if (index == -1) {
            throw new TypeError(message);
        }
        return index;
    }

    public static find(list: any[], finder: (item: any) => void, message: string = 'No such element.'): any {
        const item = list.find(item => finder(item))
        if (item === undefined || item === null) {
            throw new TypeError(message);
        }
        return item;
    }
    
}