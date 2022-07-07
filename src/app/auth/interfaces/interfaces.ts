

export interface authResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    email?: string;
    user?: string;
    msg?: string;
}

export interface Usuario{
    uid: string;
    user: string;
    email: string;
}