import { IsString, IsNotEmpty} from 'class-validator';

/**
 *
 * 
 * @category DTOs
 * @class AuthDTO
 * @param {string} email- the tile of resource
 */
class EmailDTO {
    @IsString()
    @IsNotEmpty()
    public email: string;

    /**
     * 
     * @param email 
     * @memberof EmailDTO
     */
    constructor(email:string){
        this.email = email;
    }
}

export default EmailDTO