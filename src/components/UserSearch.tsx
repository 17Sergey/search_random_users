import { ChangeEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { UsersList } from "./UsersList";

import { usersAPI } from "../api/usersAPI";
import { BREAKPOINTS } from "../utils/breakpoints";
import { QUERY_KEYS } from "../utils/queryKeys";

const StyledWrapper = styled.section`
    text-align: center;
    max-width: 600px;
    margin: 1rem auto;
`;

const StyledHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin: 1em 0;

    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        font-size: 2rem;
    }
`;

const StyledForm = styled.form`
    width: 100%;
    margin: 1em 0;
`;
const StyledSearch = styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
`;

const StyledInput = styled.input`
    width: 100%;
    background: transparent;

    font-size: 1.1rem;

    border: 1px solid lightgray;
    border-radius: 0.25em;

    padding: 0.5em 1em;

    &:focus-within {
        outline: 1px solid rgba(0, 128, 0, 0.7);
    }
`;

const StyledButton = styled.button`
    background: rgba(0, 128, 0, 0.7);
    color: rgba(0, 0, 0, 0.8);
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25em 1em;

    &:focus {
        outline: 1px solid rgba(0, 0, 0, 0.8);
    }
`;

const StyledHint = styled.p`
    color: lightgray;
`;

const StyledError = styled.p`
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const UserSearch = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const {
        data: users,
        isInitialLoading,
        isRefetching,
        error,
        refetch,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => usersAPI.searchUsers(searchValue),
        enabled: false,
        retry: 1,
    });

    const isLoading = isInitialLoading || isRefetching;

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const searchUsers = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        refetch();
    };

    return (
        <>
            <StyledWrapper>
                <StyledHeading>Let's search users!</StyledHeading>
                <StyledForm>
                    <StyledSearch>
                        <StyledInput
                            type="text"
                            placeholder="Search users..."
                            onChange={handleSearchInputChange}
                            value={searchValue}
                        />
                        <StyledButton onClick={searchUsers}>Search</StyledButton>
                    </StyledSearch>
                </StyledForm>
                {!users && !isLoading && !error && (
                    <StyledHint>Type the value and press "Search"!</StyledHint>
                )}
                {isLoading && <p>Loading...</p>}
                {!isLoading && Boolean(error) && (
                    <StyledError>
                        {error instanceof Error ? error.message : "Unknown error happended"}
                    </StyledError>
                )}
                {!isLoading && !error && users && <UsersList users={users} />}
            </StyledWrapper>
        </>
    );
};
