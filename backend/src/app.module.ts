import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bycoders-challenge',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MovimentacaoModule
  ]
})
export class AppModule {}
