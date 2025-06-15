// Интерфейсите се използват като шаблон за обекти, определят типа на променливите, така че да спазват необходимата структура 
// За да се използват в други файлове, интерфейсите трябва да бъдат наравени видими с export
export interface Smartphone {
    manufacturer:string,
    batteryCapacity:number,
    androidName:string
}