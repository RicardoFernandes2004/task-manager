import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (ConfigService: ConfigService) => ({
            type: 'postgres',
            host: ConfigService.get<string>('DB_HOST'),
            port: +ConfigService.get<number>('DB_PORT', 5432),
            username: ConfigService.get<string>('DB_USERNAME'),
            password: ConfigService.get<string>('DB_PASSWORD'),
            database: ConfigService.get<string>('DB_NAME'),
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + '/migrations/**'],
            synchronize: false
        }),
        inject: [ConfigService],
    })],
})
export class DbModule {

}
