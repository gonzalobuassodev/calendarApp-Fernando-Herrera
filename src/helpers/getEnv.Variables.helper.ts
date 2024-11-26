interface EnvVariables {
    VITE_API_URL: string;
}


export const getEnvVariables = (): EnvVariables => {

    // import.meta.env;

    console.log(import.meta.env);

    return {
        ...import.meta.env.VITE_API_URL
    }
}