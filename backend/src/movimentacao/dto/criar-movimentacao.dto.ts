import { Natureza, Tipo } from "../movimentacao.entity";

export class CriarMovimentacaoDto {
  tipo: Tipo;
  natureza: Natureza;
  datahora: Date;
  valor: number;
  cpf: string;
  cartao: string;
  dono: string;
  loja: string;
  dataImportacao: Date;
}