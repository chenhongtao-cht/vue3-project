import { defineStore } from "pinia";
interface IState {
  mode: string;
}
export const useControlStore = defineStore("control", {
  state: (): IState => {
    return {
      mode: "userLogin",
    };
  },
  actions: {
    setMode(mode: string) {
      this.mode = mode;
    },
  },
});
