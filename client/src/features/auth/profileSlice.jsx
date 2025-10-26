import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/axios";


export const fetchProfiles = createAsyncThunk("profile/fetchProfiles",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/profiles");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)


export const uploadImage = createAsyncThunk("image/uploadImage",
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData;
            formData.append("image", file);
            const config = { headers: { 'Content-Type': 'multipart/form-data' } }
            const response = await API.post("/uploadImage", formData, config);
            console.log("Image Response", response);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// export const getImageById = createAsyncThunk("image/getImage",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await API.get(`${id}`);
//             return response.data;

//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


const initialState = {
    profiles: [],
    // uploaded: null,
    // images: {},
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // logoutUser: (state) => {
        //     state.user = null;
        //     state.error = null;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch profiles";
            })


            //Upload Image
            .addCase(uploadImage.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false;
                state.uploaded = action.payload;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // .addCase(getImageById.pending, (state) => {
            //     state.loading = true,
            //         state.error = null
            // })
            // .addCase(getImageById.fulfilled, (state, action) => {
            //     state.loading = false;
            //     // state.uploaded = action.payload;
            //     state.images[action.payload.id] = URL.createObjectURL(action.payload.blob)
            // })
            // .addCase(getImageById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // });

    },
});




export default profileSlice.reducer;
