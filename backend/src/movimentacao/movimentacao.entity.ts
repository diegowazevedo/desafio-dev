import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Tipo {
  DEBITO = 1,
  BOLETO = 2,
  FINANCIAMENTO = 3,
  CREDITO = 4,
  RECEBIMENTO_EMPRESTIMO = 5,
  VENDAS = 6,
  RECEBIMENTO_TED = 7,
  RECEBIMENTO_DOC = 8,
  ALUGUEL = 9,
}

export enum Natureza {
  SAIDA = -1,
  ENTRADA = 1
}

export function natureza(tipo: Tipo): Natureza {
  switch (tipo) {
    case (Tipo.DEBITO):
    case (Tipo.CREDITO):
    case (Tipo.RECEBIMENTO_EMPRESTIMO):
    case (Tipo.RECEBIMENTO_TED):
    case (Tipo.VENDAS):
    case (Tipo.RECEBIMENTO_DOC):
      return Natureza.ENTRADA;
    case (Tipo.BOLETO):
    case (Tipo.FINANCIAMENTO):
    case (Tipo.ALUGUEL):
      return Natureza.SAIDA;
    default:
      throw new Error('Tipo inválido');
  }
}

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('int')
  tipo: Tipo;

  @Column()
  natureza: Natureza;

  @Column()
  datahora: Date;

  @Column()
  valor: number;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 12 })
  cartao: string;

  @Column({ length: 14 })
  dono: string;

  @Column({ length: 19 })
  loja: string;

  @Column()
  dataImportacao: Date;
}

