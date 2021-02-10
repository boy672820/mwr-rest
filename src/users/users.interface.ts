export interface UserData {
    email: string
    token: string
    refresh_token: string
}

export interface ProfileRO {
    email: string
}

export interface UserRO {
    user: UserData
}

