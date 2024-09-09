import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiasModule } from './noticias/noticias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  // Configuração do host do PostgreSQL
      port: 5432,
      username: 'postgres',
      password: '022002',
      database: 'estudos_postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Escaneia todas as entidades
      synchronize: true,  // Sincroniza automaticamente o esquema com o banco de dados
    }),
    NoticiasModule,  // Importa o módulo de notícias
  ],
})
export class AppModule {}
