export const API_URL = "http://localhost:3000";

// Query Key Factory 방식
export const QUERY_KEYS = {
    todo: {
        all: ["todo"],
        list: ["todo", "list"],
        detail: (id: string) => ["todo", "detail", id]
    },
    profile: {
        all: ["profile"],
        list: ["profile", "list"],
        byId: (userId: string) => ["profile", "byId", userId]
    }
};

export const OAUTH_PROVIDERS = [
    "google",
    "kakao",
    "naver",
    "github"
] as const;

export const BUCKET_NAME = "uploads";