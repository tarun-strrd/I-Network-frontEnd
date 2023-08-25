interface ISnackBarState {
  message: string;
  severity: string;
}
const snackBarReducer = (state: ISnackBarState | null = null, action: any) => {
  //console.log("snackbar reducer");
  switch (action.type) {
    case "SET_SNACKBAR":
      return { ...action.payload };
    default:
      return null;
  }
};

export default snackBarReducer;
