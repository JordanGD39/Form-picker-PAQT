export interface IGame {
    id: string,
    name: string,
    image: string,
    console: ConsoleType,
    startRentDate: string | null,
    endRentDate: string | null,
}

export enum ConsoleType {
    NONE = <any>"None",
    SEGA_GENESIS = <any>"Sega Genesis",
    DREAMCAST = <any>"Dreamcast",
    GAMECUBE = <any>"Gamecube",
    WII = <any>"Wii",
}