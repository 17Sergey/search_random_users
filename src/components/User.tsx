import styled from "styled-components";

import { UserType } from "../utils/types";
import { BREAKPOINTS } from "../utils/breakpoints";

const Styleduser = styled.div`
    padding: 1em;
    margin: 1em auto;

    display: flex;
    gap: 2em;

    word-wrap: break-word;

    border: 1px solid green;
    border-radius: 1em;

    text-align: left;
    overflow-x: auto;
    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        gap: 1em;
    }
`;

const StyledAvatar = styled.img`
    width: 10rem;
    height: 10rem;
    max-width: 100%;

    border-radius: 50%;

    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        width: 5rem;
        height: 5rem;
    }
`;

const StyledName = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;

    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledUsername = styled.p`
    margin-bottom: 1rem;

    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        font-size: 0.9rem;
    }
`;

const StyledEmail = styled.p``;

export const User = ({ user }: { user: UserType }) => {
    return (
        <Styleduser>
            <StyledAvatar src={user.img} />
            <div>
                <StyledName>
                    {user.name.title} {user.name.first} {user.name.last}
                </StyledName>
                <StyledUsername>@{user.username}</StyledUsername>
                <StyledEmail>{user.email}</StyledEmail>
            </div>
        </Styleduser>
    );
};
