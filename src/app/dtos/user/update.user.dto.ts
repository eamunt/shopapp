import { IsString, IsNotEmpty, IsPhoneNumber, IsDate } from 'class-validator';
export class UpdateUserDTO {
    @IsString()
    full_name: string;

    @IsString()
    address: string;

    @IsString()
    old_password: string;

    @IsString()
    password: string;

    @IsString()
    retype_password: string;

    @IsDate()
    date_of_birth: Date;

    constructor(data: any) {
        this.full_name = data.phone_number;
        this.address = data.address;
        this.old_password = data.old_password;
        this.password = data.password;
        this.retype_password = data.retype_password;

        this.date_of_birth = data.date_of_birth;
    }
}
