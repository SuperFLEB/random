import chars, {RandomCharSet} from "./chars.js";
import type ValueFrom from "./ValueFrom.js";

export default class RandomNamespace {
	#id: string;
	prefixInstanceId: boolean = false;
	constructor(length: number = 5, prefix: string = "_", charset: ValueFrom<typeof RandomCharSet> = RandomCharSet.biased, prefixInstanceId: boolean = false) {
		this.#id = chars(length, prefix, "", charset);
		this.prefixInstanceId = prefixInstanceId;
	}
	setId(id: string): void {
		this.#id = id;
	}
	id(instanceId?: string, swapInstanceId: boolean = false): string {
		const parts = [this.#id, instanceId];
		if (this.prefixInstanceId !== swapInstanceId) parts.reverse();
		return parts.join("");
	}
	fragment(instanceId?: string, swapInstanceId: boolean = false): string {
		return "#" + this.id(instanceId, swapInstanceId);
	}
	url(instanceId?: string, quote: string = "'", swapInstanceId: boolean = false): string {
		return `url(${quote}#${this.id(instanceId, swapInstanceId)}${quote})`;
	}
}