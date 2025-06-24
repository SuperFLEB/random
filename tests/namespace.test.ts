import {vi, expect, describe, it, beforeEach, afterEach, test} from "vitest";
import Namespace from "../src/namespace.js";
import chars, {RandomCharSet} from "../src/chars.js";

describe("randomNamespace", () => {
	beforeEach(() => {
		vi.mock("../src/chars.js", async (importOriginal) => {
			return {
				...(await importOriginal()),
				default: vi.fn(() => "random"),
			};
		});
	});

	for (const testSetup of [[false, false, "randomname"], [true, false, "namerandom"], [true, true, "randomname"]] as [boolean, boolean, string][]) {
		describe(`with default prefix ${testSetup[0]} and swap ${testSetup[1]}`, () => {
			it(`Generates an ID`, () => {
				const ns = new Namespace(6, "", "xml", testSetup[0]);
				expect(ns.id("name", testSetup[1])).toEqual(testSetup[2]);
			});

			it("Generates a fragment name", () => {
				const ns = new Namespace(6, "", "xml", testSetup[0]);
				expect(ns.fragment("name", testSetup[1])).toEqual(`#${testSetup[2]}`);
			});

			it("Generates a fragment URL with a single quote", () => {
				const ns = new Namespace(6, "", "xml", testSetup[0]);
				expect(ns.url("name", "'", testSetup[1])).toEqual(`url('#${testSetup[2]}')`);
			});

			it("Generates a fragment URL with a custom quote", () => {
				const ns = new Namespace(6, "", "xml", testSetup[0]);
				expect(ns.url("name", "x", testSetup[1])).toEqual(`url(x#${testSetup[2]}x)`);
			});

			it("Passes options to randomChars", () => {
				new Namespace(10, "prefix", RandomCharSet.hex, testSetup[0]);
				expect(chars).toHaveBeenCalledExactlyOnceWith(10, "prefix", "", RandomCharSet.hex);
			});

			it("Allows changing the ID", () => {
				const ns = new Namespace(10, "prefix", RandomCharSet.hex, testSetup[0]);
				ns.setId("notrandom");
				const expected = { "randomname": "notrandomname", "namerandom": "namenotrandom" }[testSetup[2]];
				expect(ns.id("name", testSetup[1])).toEqual(expected);
			});
		});
	}

	describe("with no options except instanceId specified", () => {
		it("Passes options to randomChars", () => {
			new Namespace();
			expect(chars).toHaveBeenCalledExactlyOnceWith(5, "_", "", RandomCharSet.biased);
		});
		it(`Generates a suffixed ID by default`, () => {
			const ns = new Namespace();
			expect(ns.id("name")).toEqual("randomname");
		});

		it("Generates a suffixed fragment name by default", () => {
			const ns = new Namespace();
			expect(ns.fragment("name")).toEqual(`#randomname`);
		});

		it("Generates a suffixed fragment URL with a single quote by default", () => {
			const ns = new Namespace();
			expect(ns.url("name")).toEqual(`url('#randomname')`);
		});
	});

	describe("with no instanceId given", () => {
		it(`Generates an ID`, () => {
			const ns = new Namespace();
			expect(ns.id()).toEqual("random");
		});

		it("Generates a fragment name", () => {
			const ns = new Namespace();
			expect(ns.fragment()).toEqual(`#random`);
		});

		it("Generates a fragment URL with a single quote", () => {
			const ns = new Namespace();
			expect(ns.url()).toEqual(`url('#random')`);
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});
});