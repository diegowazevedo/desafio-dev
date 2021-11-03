import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { MovimentacaoModule } from './movimentacao.module';

describe('MovimentacaoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'bycoders-challenge-test',
          entities: [],
          autoLoadEntities: true,
          synchronize: true,
        }),
        MovimentacaoModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve permitir uploads de arquivos', async () => {
    return request(app.getHttpServer())
      .post('/file')
      .attach('file', '../CNAB.txt')
      .expect(201)
      .expect([
        { 'loja': 'BAR DO JOÃO       ', 'saldo': '-102' },
        { 'loja': 'LOJA DO Ó - FILIAL', 'saldo': '152' },
        { 'loja': 'LOJA DO Ó - MATRIZ', 'saldo': '230' },
        { 'loja': 'MERCADO DA AVENIDA', 'saldo': '489' },
        { 'loja': 'MERCEARIA 3 IRMÃOS', 'saldo': '-7023' }
      ]);
  });

  afterAll(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.clear();
    }

    await app.close();
  });
});
