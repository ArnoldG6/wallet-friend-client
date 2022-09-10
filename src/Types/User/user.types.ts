import Role from "./role.types";

export default interface User {
    username: string;
    email: string;
    enabled: boolean;
    creation_datetime: Date;
    first_name: string;
    last_name: string;
    roles: Role[];
}