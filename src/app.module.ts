import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [UserModule, AvaliacaoModule, ComentarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

