import { RaffleOption } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class RaffleOptionModel extends BaseModel<RaffleOption> {
    static getBlanc(optionName: Scalars["String"], availableUsers: Array<string>): RaffleOption;
    get optionName(): string;
    set optionName(input: string);
    get availableUsers(): string[];
    set availableUsers(input: string[]);
}
