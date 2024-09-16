import { create } from "zustand";

export type User = {
    userName?: string;
    userId: number | null;
    userTokenId: string;
    userEmail: string;
    isNewUser: boolean;
};

type UserActions = {
    setUser: (user: User) => void;
    resetUser: () => void
};

const useUserStore = create<User & UserActions>((set) => ({
    userName: '',
    userId: null,
    userTokenId: '',
    userEmail: '',
    isNewUser: false, //TODO add isNewUser functionality
    setUser: (user: User) => {
        set(() => ({
            userName: user.userName,
            userId: user.userId,
            userTokenId: user.userTokenId,
            userEmail: user.userEmail
          })
        );
    },
    resetUser: () => {
        set(() => ({
            userName: '',
            userId: null,
            userTokenId: '',
            userEmail: ''
          })
        );
    }, 
}));

export default useUserStore;