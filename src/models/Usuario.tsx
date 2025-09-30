export default interface Usuario {
    id?: number;
    nome: string;
    usuario: string;
    senha: string;
    cep: string;
    objetivo: 'emagrecer' | 'hipertrofia' | 'geral';
    endereco: string;
    token: string;
    foto?: string;
     isMasterAdmin?: boolean;
}
