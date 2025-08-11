import { PartialType } from "@nestjs/swagger";
import { CreateOilChangeDto } from "./create-oil-change.dto";
import { OmitType } from "@nestjs/swagger";

export class UpdateOilChangeDto extends PartialType(
  OmitType(CreateOilChangeDto, ['oilType'] as const)
) {}