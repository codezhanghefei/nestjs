import { Transform, Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateIf, IsString, Length, Matches, Max, Min, ValidateNested, IsPositive, IsArray, ArrayMaxSize, ArrayMinSize } from "class-validator";

class UserDto {
  @IsNotEmpty()
  @IsIn(['man', 'woman'])
  gender: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  age: number;
}
export class classValidatorQueryDto {
  @IsNotEmpty({ message: '不能为空' })
  @IsString()
  @Length(2, 4)
  readonly key: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly number?: number;
}

export class classValidatorBodyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({value, obj}) => {
    // console.log(value, obj);
    return value.trim();
  })
  trimBefore: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly number?: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['18812041995', '18812041996'])
  @Matches(/^1[34578]\d{9}$/)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  password?: string;

  // 条件校验
  @ValidateIf((object, value) => {
    // console.log('validateIf', object, value);
    return value.includes('zhf');
  })
  @IsString()
  @Length(6)
  username: string;

  // 深度校验
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  // 深度数组校验
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];

  @IsArray()
  @ArrayMinSize(3)
  arr;
}
