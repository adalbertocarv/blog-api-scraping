import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from './noticias.entity';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
    private readonly httpService: HttpService,
  ) {}

  async procurarNoticias(): Promise<Noticia[]> {
    // Usando lastValueFrom para lidar com o Observable retornado por HttpService.get
    const response = await lastValueFrom(
      this.httpService.get('https://semob.df.gov.br/')
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const noticias = [];

    $('.links-destaques').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const imgStyle = $(element).find('.img-destaque').attr('style');
      const imgUrl = imgStyle
        ? imgStyle.substring(imgStyle.indexOf("url('") + 5, imgStyle.indexOf("')"))
        : null;
      const title = $(element).find('.titulo-noticia').text();
      const description = $(element).find('.sutia').text();

      if (imgUrl && title && link) {
        const noticia = this.noticiaRepository.create({
          title,
          description,
          imgUrl,
          url: link,
        });
        noticias.push(noticia);
      }
    });

    return this.noticiaRepository.save(noticias);  // Salva as notícias no banco de dados
  }
}
