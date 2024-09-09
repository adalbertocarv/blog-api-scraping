import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';  // Certifique-se de importar o HttpModule
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { Noticia } from './noticias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Noticia]),  // Entidade Noticia
    HttpModule,  // HttpModule para permitir uso do HttpService
  ],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
