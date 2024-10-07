import styled from "styled-components";
import { UserSearch } from "./components/UserSearch";

const StyledAppWrapper = styled.div`
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    padding: 0 1rem;
`;

export const App = () => {
    return (
        <>
            <main>
                <StyledAppWrapper>
                    <UserSearch />
                </StyledAppWrapper>
            </main>
        </>
    );
};
