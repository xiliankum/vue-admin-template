import { login, logout } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    info: {},
  };
};

const state = getDefaultState();

const mutations = {
  // 重置State
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 储存token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 储存用户信息
  SET_USERINFO: (state, userInfo) => {
    state.info = userInfo;
  },
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
      })
        .then((response) => {
          const { data } = response;
          console.log("data", data);
          commit("SET_TOKEN", data.token);
          commit("SET_USERINFO", data.info);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // 必须先删除token
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // 必须先删除token
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
