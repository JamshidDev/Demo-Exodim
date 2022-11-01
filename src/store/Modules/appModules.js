
const state ={
    activeHorizantal: JSON.parse(localStorage.getItem("menu")) || false,
    activeSidebar:JSON.parse(localStorage.getItem("sidebar")) || false,
    page:1,
    per_page:10,
    isDark:JSON.parse(localStorage.getItem("theme-dark")) || false,
}

const getters ={
    get_menuType(state){
        return state.activeHorizantal
    },
    get_Sidebar(state){
        return state.activeSidebar
    },
    get_darkTheme(state){
        console.log(state.isDark);
        return state.isDark
    }
}

const actions ={
    actionMenu(ctx, payload){
        localStorage.setItem("menu", JSON.stringify(payload))
        ctx.commit("update_Menu", payload)
    },
    actionSidebar(ctx, payload){
        localStorage.setItem("sidebar", JSON.stringify(payload))
        ctx.commit("update_Sidebar", payload)
    },
    actionisDark(ctx, payload){
        ctx.commit("update_isDark", payload)
    },

   
}

const mutations={
    update_Menu(state, item){
        state.activeHorizantal = item
    },
    update_Sidebar(state, item){
        state.activeSidebar = item
    },
    update_isDark(state, item){
        state.isDark = item
    },
  
}

export default { state, actions, getters, mutations}