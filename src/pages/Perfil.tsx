import { AnonymusProfile } from "../components/AnonymusProfile";
import { UserProfile } from "../components/UserProfile";
import { useAuthContext } from "../contexts/AuthContext";
import { PrincipalPage } from "../layout/PrincipalPage"

export const Perfil = () => {
    const { firebaseAuth } = useAuthContext();

    return (
        <PrincipalPage>
            {
                firebaseAuth.currentUser?.isAnonymous 
                    ? <AnonymusProfile />
                    : <UserProfile />
            }
        </PrincipalPage>
    );
}