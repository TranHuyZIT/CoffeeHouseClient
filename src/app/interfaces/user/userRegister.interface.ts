import UserRole from 'src/app/enum/user-role.enum';
import Gender from 'src/app/enum/gender.enum';

export default interface UserRegister {
    name: string;
    userName: string;
    password: string;
    email: string;
    role: UserRole;
    gender: Gender;
    phone: string;
}
