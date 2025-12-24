import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { AWS_CLIENT } from 'src/aws/common/aws.contants';
import appConfig from 'src/config/app.config';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uploads } from '../uploads.entity';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class UploadsService {
  constructor(
    @Inject(AWS_CLIENT) private readonly aws_client: S3Client,
    @Inject(appConfig.KEY)
    private readonly appEnv: ConfigType<typeof appConfig>,
    @InjectRepository(Uploads)
    private readonly uploadsRepository: Repository<Uploads>,
    private readonly usersService: UsersService,
  ) {}

  async uploadedFile(file: Express.Multer.File, userId: number) {
    const key = `uploads/${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.appEnv.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer, // The buffer from file object
      ContentType: file.mimetype,
    });

    try {
      // Upload to S3
      await this.aws_client.send(command);

      //Save the data to database
      const user = await this.usersService.getUserById(userId);
      const uploadRecord = this.uploadsRepository.create({
        fileName: file.originalname,
        mimeType: file.mimetype,
        path: `https://${this.appEnv.CLOUD_FRONT_URL}/${key}`,
        size: file.size,
        userId: user,
      });
      return this.uploadsRepository.save(uploadRecord);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
