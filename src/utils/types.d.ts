export type UserType = {
    username: string;
    email: string;
    img: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
};

export type APIUserType = {
    login: {
        username: string;
    };
    email: string;
    picture: {
        large: string;
    };
    name: {
        title: string;
        first: string;
        last: string;
    };
};
