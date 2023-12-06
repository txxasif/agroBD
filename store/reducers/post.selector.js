const { createSelector } = require("@reduxjs/toolkit");

const post = (state) => state.post;
export const isPostCreatedSelector = createSelector([post],(post)=>post.createPostStatus);
export const isPostErrorSelector = createSelector([post],(post)=>post.postError);
export const postErrorMessageSelector = createSelector([post],(post)=>post.postErrorMessage);

