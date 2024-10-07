import { User } from "./User";

import { UserType } from "../utils/types";
import styled from "styled-components";

const StyledNoFound = styled.div`
    font-size: 1.5;
`;

export const UsersList = ({ users }: { users: UserType[] }) => {
    return (
        <div>
            {users?.length === 0 && (
                <StyledNoFound>Unfortunately, no users were found...</StyledNoFound>
            )}
            {users?.map((user) => (
                <User
                    key={user.username}
                    user={user}
                />
            ))}
        </div>
    );
};
