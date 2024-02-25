import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

// Additional function to check if a user is blocked or deleted
const checkBlockedOrDeleted = (user) => {
    return user.isBlocked || user.isDeleted;
};

// Thunk to fetch users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userList = querySnapshot.docs.map((doc) => {
            const userData = doc.data();
            userData.id = doc.id;
            return userData;
        });
        return userList;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoading(state) {
            state.loading = true;
        },
        userLoaded(state, action) {
            state.users = action.payload;
            state.loading = false;
        },
        authError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        userLogout(state) {
            state.users = [];
            state.loading = false;
            state.error = null;
        },
        toggleModal(state, action) {
            state.showModal = action.payload; 
        },
        checkBlockedOrDeletedUser(state, action) {
            const userId = action.payload;
            const userIndex = state.users.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                state.users[userIndex].isBlockedOrDeleted = checkBlockedOrDeleted(state.users[userIndex]);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { userLoading, userLoaded, authError, userLogout, checkBlockedOrDeletedUser, toggleModal } = userSlice.actions;

export default userSlice.reducer;
