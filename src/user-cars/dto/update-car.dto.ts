import { CreateCarDto } from "./create-car.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateCarDto extends PartialType(CreateCarDto) { }