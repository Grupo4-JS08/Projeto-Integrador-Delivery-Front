export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    objetivo: 'emagrecer' | 'hipertrofia' | 'geral';
    endereco: string;
    token: string;
}