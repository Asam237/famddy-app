export type CreateUserInput = {
    full_name: string
    email: string
    password: string
};

export type LoginUserInput = {
    email: string
    password: string
}

export type ShortenerInput = {
    url: string
}

export type ShortenerUserInput = {
    longUrl: string
    user: string
}

