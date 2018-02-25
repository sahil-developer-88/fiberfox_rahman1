
export class RegisterModel {
    Id: number;
    UserName: string;
    Email: string;
    Password: string;
    PhoneNumber: number;
    IndusryField:string;
    ActivityField:string;
    SpecifyActivityField:string;
    ExperienceLevel:string;
    CreatedOn:string;
    IsActive:boolean;
    IsDeleted:boolean;
    
    ConfirmPassword:string;
    RememberMe:boolean;
}


export class LoginModel{
    Email:string;
    password:string;
    rememberMe:boolean;
}

export  class LoginResponseModel {
    access_token: string;
    expires_in: string;
    iat: string;
    exp: string;
    roleName:string;
    IsAuthenticated: boolean;
    ErrorMessage: string;

    Id: number;
    UserName: string;
    Email: string;
    //PhoneNumber: number;
    IndusryField:string;
    ActivityField:string;
    SpecifyActivityField:string;
    ExperienceLevel:string;
    CreatedOn:string;
}

