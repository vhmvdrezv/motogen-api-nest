import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { SortOrder } from "src/common/enums/sort-order.enum";

export class GetAllPurchasesDto {
    @ApiPropertyOptional({
        description: 'ترتیب نمایش',
        enum: SortOrder,
        example: SortOrder.ASC
    })
    @IsOptional()
    @IsEnum(SortOrder, { message: 'ترتیب نامعتبر است. فقط asc یا desc مجاز است.' })
    order?: SortOrder;
}