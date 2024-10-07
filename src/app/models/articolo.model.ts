export interface Response {
    articoli: Articolo[]
    totale_articoli: number
    messaggio?: string
}

export interface RicercaArticoli {
    attivita: string
    prezzo: { min: number, max: number }
    taglia: string
    colore: string,
    skip:number
}

export interface Articolo {
    _id: string
    nome: string
    attivita: string
    prezzo: number
    taglie_disponibili: string[]
    colori_disponibili: string[]
    descrizione: string
    immagine: string[]
    nuovo_arrivo: boolean
    best_seller: number
}

export interface ArticoloCarrello {
    nome: string
    attivita: string
    prezzo: number
    prezzo_finale: number
    taglia: string
    colore: string
    immagine?: string
    quantita: number
}

export interface Ordine {

    dati_spedizione: {

        nome: string 
        cognome: string 
        indirizzo: {
            via_civico: string 
            cap: string 
            citta: string 
            provincia: string 
            paese: string 
        },
        telefono: string 
        email: string 
        spedizione_veloce: boolean 
    }

    ordine: ArticoloCarrello[]
    metodo_pagamento: string
    costo_spedizione: number
    totale: number
    data_ordine: string
    data_spedizione: string
}

