export const API_URL = "http://localhost:3000";

// Query Key Factory 방식
export const QUERY_KEYS = {
    todo: {
        all: ["todo"],
        list: ["todo", "list"],
        detail: (id: string) => ["todo", "detail", id]
    }
};

export const OAUTH_PROVIDERS = [
    "google",
    "kakao",
    "naver",
    "github"
] as const;