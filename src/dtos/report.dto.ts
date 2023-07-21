import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
// Estas validaciones se activan en el main usando app.useGlobalPipes(new ValidationPipe())

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class EditReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}
