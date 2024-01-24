import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsIn, IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto<T> {
    @ApiPropertyOptional({
        default: 1,
        description: 'Page number',
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page: number = 1;

    @ApiPropertyOptional({
        default: 10,
        description: 'Item per page',
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly limit: number = 10;

    @ApiProperty()
    readonly totalItems: number;

    @ApiProperty({ type: [Object]})
    readonly items: T[];

    constructor(page: number, limit: number, totalItems: number, items: T[]) {
        this.page = page,
        this.limit = limit,
        this.totalItems = totalItems,
        this.items = items
    }
}
