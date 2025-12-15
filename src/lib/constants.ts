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
    },
    post: {
        all: ["post"],
        list: ["post", "list"],
        userList: (userId: string) => ["post", "userList", userId],
        byId: (postId: number) => ["post", "byId", postId]
    },
    comment: {
        all: ["comment"],
        post: (postId: number) => ["comment", "post", postId]
    }
};

export const OAUTH_PROVIDERS = [
    "google",
    "kakao",
    "naver",
    "github"
] as const;

export const BUCKET_NAME = "uploads";