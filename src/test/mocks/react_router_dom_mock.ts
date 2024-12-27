import * as actualReactRouterDom from "react-router-dom";
import { vi } from "vitest";

const mockReactRouterDom = {
	...actualReactRouterDom,

	useLocation: vi.fn().mockReturnValue({
		pathname: "/",
		search: "",
		hash: "",
		state: null,
		key: "default",
	}),

	useNavigate: vi.fn(() => vi.fn()),

	useParams: vi.fn().mockReturnValue({}),

	useMatches: vi.fn().mockReturnValue([]),

	useOutlet: vi.fn().mockReturnValue(null),

	useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]),
} as typeof actualReactRouterDom;

export default mockReactRouterDom;
