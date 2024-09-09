import { Controller, Get } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { Noticia } from './noticias.entity';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  async getNoticias(): Promise<Noticia[]> {
    return this.noticiasService.procurarNoticias();
  }
}
