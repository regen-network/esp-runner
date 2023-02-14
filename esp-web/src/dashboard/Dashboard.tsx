import LoginButton from "../auth/login";
import {useAuth0} from "@auth0/auth0-react";
import {LogoutButton} from "../auth/logout";

export const Dashboard = (): JSX.Element => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if(isLoading) {
        return <div>Loading</div>
    }

    if(isAuthenticated) {
        return <div>
            <div>Hello {user?.name}</div>
            <LogoutButton />
        </div>
    } else {
        return <div><LoginButton /></div>
    }
}