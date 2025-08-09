import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { OilType } from "generated/prisma";
import { SortOrder } from "src/common/enums/sort-order.enum";

export class GetAllOilChangesDto {
    @ApiPropertyOptional({
        description: 'نوع روغن',
        enum: OilType,
        example: OilType.ENGINE
    })
    @IsOptional()
    @IsNotEmpty({ message: 'انتخاب نوع روغن الزامی است.' })
    @IsEnum(OilType, { message: 'نوع روغن نامعتبر است.' })
    oilType?: OilType;

    @ApiPropertyOptional({
        description: 'ترتیب نمایش',
        enum: SortOrder,
        example: SortOrder.ASC
    })
    @IsOptional()
    @IsEnum(SortOrder, { message: 'ترتیب نامعتبر است. فقط asc یا desc مجاز است.' })
    order?: SortOrder;
}