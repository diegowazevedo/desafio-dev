import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoController } from './movimentacao.controller';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao } from './movimentacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  providers: [MovimentacaoService],
  controllers: [MovimentacaoController],
})
export class MovimentacaoModule {}
