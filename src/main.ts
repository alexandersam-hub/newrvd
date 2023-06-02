import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const httpsOptions = {
    cert: fs.readFileSync("../sslcert/fullchain.pem"),
    key: fs.readFileSync("../sslcert/privkey.pem"),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(8034);
}
bootstrap();
