
export class GlobalMapsDefs {

    protected static _globalMap = {};
    public static setGlobalMap(key: string, map: Object) {
        this._globalMap[key] = map;
    }
    public static getGlobalMap(key: string) {
        return this._globalMap[key];
    }

}