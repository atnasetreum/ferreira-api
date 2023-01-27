export declare const EnvConfiguration: () => {
    environment: string;
    appKey: string;
    jwt: {
        secretKey: string;
    };
    db: {
        host: string;
        username: string;
        password: string;
        name: string;
        port: string;
    };
};
