import { observable, action } from "mobx";

class RootStore {
  @observable mobile = "13710641319";

  @observable token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI0MCwibmFtZSI6IjEzNzEwNjQxMzE5IiwiaWF0IjoxNjI0NTYyOTQwLCJleHAiOjE2NTA0ODI5NDB9.msy78_k72mYtE3gA_frJvBTm-B1e6MhiAhac9um4i3M";
  // @observable token = "";

  @observable userId = "137106413191624055073780";
  
  @action setUser(mobile, token, userId) {
    this.mobile = mobile;
    this.token = token;
    this.userId = userId;
  }
}

export default new RootStore();