import { Ordine } from "./articolo.model"

export interface CreateAccountRequest {
    nome:string
    cognome:string
    email:string
    password:string
    ordini: Ordine[]
}

export interface OrdiniEffettuati {
    ordini: {
        ordini: Ordine[]
    } 
}

export interface LoggedAccount {
    _id:string
    nome:string
    cognome:string
    email:string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface GenericResponse {
    message: string
}

export interface LoginResponse extends GenericResponse {
    token: string
}