import { Injectable } from '@nestjs/common';
import { Movimentacao, natureza, Natureza, Tipo } from './movimentacao.entity';
import * as dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarMovimentacaoDto } from './dto/criar-movimentacao.dto';

interface RespostaImportacao {
  dataImportacao: Date;
  movimentacoes: Movimentacao[];
}

interface RespostaListaPorLoja {
  loja: string;
  saldo: number;
}

@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectRepository(Movimentacao)
    private readonly repository: Repository<Movimentacao>,
  ) { }

  create(criarMovimentacaoDto: CriarMovimentacaoDto): Promise<Movimentacao> {
    const movimentacao = new Movimentacao();
    movimentacao.tipo = criarMovimentacaoDto.tipo;
    movimentacao.natureza = criarMovimentacaoDto.natureza;
    movimentacao.datahora = criarMovimentacaoDto.datahora;
    movimentacao.valor = criarMovimentacaoDto.valor;
    movimentacao.cpf = criarMovimentacaoDto.cpf;
    movimentacao.cartao = criarMovimentacaoDto.cartao;
    movimentacao.dono = criarMovimentacaoDto.dono;
    movimentacao.loja = criarMovimentacaoDto.loja;
    movimentacao.dataImportacao = criarMovimentacaoDto.dataImportacao;

    return this.repository.save(movimentacao);
  }

  async importar(file: Express.Multer.File): Promise<RespostaImportacao> {
    const dados = file.buffer.toString().split('\n');
    const dataImportacao = new Date();
    const movimentacoes: Movimentacao[] = [];

    for (const i in dados) {
      if (dados[i].length == 80) {
        const movimentacaoDto = new CriarMovimentacaoDto();
        movimentacaoDto.tipo = Number(dados[i].substring(0, 1));
        movimentacaoDto.natureza = natureza(movimentacaoDto.tipo);
        movimentacaoDto.datahora = dayjs(dados[i].substring(1, 9) + dados[i].substring(42, 48)).toDate();
        movimentacaoDto.valor = Number(dados[i].substring(9, 19)) / 100;
        movimentacaoDto.cpf = dados[i].substring(19, 30);
        movimentacaoDto.cartao = dados[i].substring(30, 42);
        movimentacaoDto.dono = dados[i].substring(48, 62);
        movimentacaoDto.loja = dados[i].substring(62, 81);
        movimentacaoDto.dataImportacao = dataImportacao;

        const movimentacao = await this.create(movimentacaoDto);

        movimentacoes.push(movimentacao);
      }
    };

    return {
      dataImportacao,
      movimentacoes
    };
  }

  async saldoPorLoja(): Promise<RespostaListaPorLoja[]> {
    const list: RespostaListaPorLoja[] = await this.repository.createQueryBuilder('movimentacao')
      .select('movimentacao.loja', 'loja')
      .addSelect('SUM(movimentacao.natureza * movimentacao.valor)', 'saldo')
      .groupBy('movimentacao.loja')
      .getRawMany();

    return list;
  }

}
