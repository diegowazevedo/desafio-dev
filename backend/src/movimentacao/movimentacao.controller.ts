import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovimentacaoService } from './movimentacao.service';

@Controller()
export class MovimentacaoController {
  constructor(private readonly service: MovimentacaoService) { }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      await this.service.importar(file);
      const saldoPorLoja = await this.service.saldoPorLoja();
      return saldoPorLoja;
    }
    catch (e) {
      return e;
    }
  }
}
