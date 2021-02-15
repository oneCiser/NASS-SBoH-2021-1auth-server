import { IsString, IsNotEmpty} from 'class-validator';


/**
 *
 * 
 * @category DTOs
 * @class AuthDTO
 * @param {string} username- the tile of resource
 * @param {string} password
 */
class AuthDTO {
    @IsString()
    @IsNotEmpty()
    public username: string;
    @IsNotEmpty()
    @IsString()
    public password: string;

    /**
     * 
     * @param username 
     * @param password
     * @memberof AuthDTO
     */
    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}

export default AuthDTO