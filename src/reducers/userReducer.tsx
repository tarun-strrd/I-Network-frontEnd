export const reducer = (state: any = null, action: any) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "UPDATEPROFILE") {
    //console.log(action.payload);
    return { ...state, ...action.payload };
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      following: action.payload.following,
    };
  }

  if (action.type === "CLEAR") {
    return null;
  }
  return null;
};
