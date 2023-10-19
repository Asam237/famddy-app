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
    longUrl: string
}

export type ShortenerUserInput = {
    longUrl: string
    user: string
}

export type CardComponentType = {
    longUrl: string
    date?: Date
    shortUrl: string
    _id?: any
    updated_at?: Date
};

