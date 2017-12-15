interface Persistence{
    store: any;

    define(name: string, properties: any);
    add(model: any);
    remove(model: any)
    transaction(tx: any);
    flush(tx?: any, cb?: any);
    schemaSync(tx?: any);
}

declare var persistence: Persistence;

declare module 'persistence' {
    export = persistence;
}