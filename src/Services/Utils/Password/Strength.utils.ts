import {requirements} from "./Requirements";
export default function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;
    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
