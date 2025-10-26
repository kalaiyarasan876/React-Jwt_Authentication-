import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../../api/axios";


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

export const getImageById = createAsyncThunk("image/getImage",
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`${id}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const imageSlice = createSlice({
    name: "image",
    reducers: {},
    initialState: {
        uploaded: null,
        images: {},
        loading: false,
        error: null
    },


    extraReducers: (builder) => {
        builder
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

            .addCase(getImageById.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getImageById.fulfilled, (state, action) => {
                state.loading = false;
                // state.uploaded = action.payload;
                state.images[action.payload.id] = URL.createObjectURL(action.payload.blob)
            })
            .addCase(getImageById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


export default imageSlice.reducer;