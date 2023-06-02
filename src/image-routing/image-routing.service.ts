import { Injectable } from "@nestjs/common";
import { v1 as uuidv1 } from "uuid";
import { FileElementResponse } from "./dto/file-element.response";
import { path } from "app-root-path";
import { ensureDir, writeFile, remove } from "fs-extra";
import { TypeImage } from "./dto/type-image.enum";
import * as fs from "fs";
import { QuizService } from "../quiz/quiz/quiz.service";
import { QuestionsService } from "../quiz/questions/questions.service";
import { Quiz } from "../quiz/quiz/quiz.model";

@Injectable()
export class ImageRoutingService {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionsService
  ) {
  }

  async saveFile(
    file: Express.Multer.File,
    typeCategoryImage: string
  ): Promise<FileElementResponse> {
    const uploadFolder = `${path}/uploads/${typeCategoryImage}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse = new FileElementResponse();
    const timeStamp = uuidv1();
    const newFileName = `${timeStamp}_${file.originalname}`;
    await writeFile(`${uploadFolder}/${newFileName}`, file.buffer);
    res.url = `${typeCategoryImage}/${newFileName}`;
    res.name = newFileName;
    return res;
  }

  async removeFiles() {
    let imagesFilesName: string[] =
      await this.quizService.getImageListQuizzes();
    await this.startRemoveFile("quiz", imagesFilesName);
    imagesFilesName = await this.quizService.getImageListCategory();
    await this.startRemoveFile("category", imagesFilesName);

    const quizList: Quiz[] = JSON.parse(
      JSON.stringify(await this.quizService.getAllQuizzes())
    );
    imagesFilesName = []
    for (const quiz of quizList) {
      const images = await this.questionService.getImageListQuestions(
        quiz.id
      );
      imagesFilesName = [...imagesFilesName, ...images];
    }
    await this.startRemoveFile("questions", imagesFilesName);
    return {status:true}
  }

  private async startRemoveFile(typeImage: string, imagesFilesName: string[]) {
    fs.readdir(`${path}/uploads/${typeImage}`, (err, files) => {
      files.forEach((file) => {
        if (!imagesFilesName.includes(file)) {
          remove(`${path}/uploads/${typeImage}/${file}`);
        }
      });
    });
  }

  // async getImageById(id: string) {}
}
