import { assertEquals } from "$std/assert/assert_equals.ts"
import { slugify } from "./slugify.ts"

Deno.test("slugify() removes parenthesis, spaces and dots", () => {
	assertEquals(slugify("특근·잔업"), "특근_잔업")
	assertEquals(slugify("식사(비)지급"), "식사비지급")
})
