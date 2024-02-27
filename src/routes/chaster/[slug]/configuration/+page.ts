export const prerender = true;
export const load = ({ params }) => {
    return {
        slug: params.slug
    }
}
export function entries() {
	return [
		{ slug: "extended_wheel" },
		{ slug: "penalties" }
	];
}