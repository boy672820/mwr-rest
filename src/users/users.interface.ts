export interface UserData {
    email: string
    token: string
    refresh_token: string
    cookie: string
}

export interface ProfileRO {
    email: string
}

export interface UserRO {
    user: UserData
}

