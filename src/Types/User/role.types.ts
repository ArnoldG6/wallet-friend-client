import Permission from "./permission.types";

export default interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}