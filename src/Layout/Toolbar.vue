<template >
  <div class="fixed top-0 left-0 w-full z_index_top">
    <Toolbar class="custom_bg px-4  pb-2 pt-2">
      <template #start>
        <Button
        v-show="!get_menuType"
          icon="pi pi-bars"
          class="p-button-rounded p-button-outlined p-button-secondary p-button-sm p-0"
          @click="controlNavbar()"
          
        />
        <img v-show="get_menuType"   @click="poshGo()" class="logo-picture cursor-pointer pl-2" src="https://railway.uz/local/templates/main_v2/img/logo.webp" alt="">
      </template>

      <template #end>
        <Avatar
          icon="pi pi-bell"
          v-badge.success="4"
          shape="circle"
          size="medium"
          class="mr-4"
          @click="toggle2"
        />
        <Menu
          id="overlay_menu"
          ref="notefication"
          :model="notefications"
          :popup="true"
          class="
            scalein
            animation-duration-200
            animation-iteration-count:
            1
            w-25rem
            py-3
          "
        >
          <template #item="{ item }">
            <div class="w-full relative pt-5">
              <div
                class="
                  text-lg
                  font-semibold
                  uppercase
                  pb-2
                  border-bottom-1
                  w-full
                 border-300
                  px-4
                  absolute
                  top-0
                  left-0
                  text-blue-600
                  
                "
              >
                Xabarlar
              </div>
              <div class="min-h-20rem max-h-20rem h-20rem overflow-y-auto overflow-hidden notefications_scroll cursor-pointer">
                <div class="surface-200 px-4 py-2  font-medium text-base ">
                  {{ item.label }}
                </div>
                 <div
                v-for="subItem in item.subItems"
                :key="subItem.label"
                class="text-sm pl-4 py-2"
              >
                {{ subItem.label }}
              </div>
              <div class="cursor-pointer w-full bg-white py-2 px-4 text-center text-sm font-semibold uppercase text-blue-600  absolute
                  bottom-0
                  left-0">
                <i class="pi pi-plus-circle text-sm mr-1"></i> Barchasi
              </div>
              </div>

             
            </div>
          </template>
        </Menu>
        <Avatar
          :image="admin_avatar()"
          shape="circle"
          size="medium"
          @click="toggle"
          class="
            mr-2
           scalein
            animation-duration-200
            animation-iteration-count:
            1
          "
        />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </template>
    </Toolbar>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import EventBus from "../util/appEventBus.js";
export default {
  data() {
    return {
      items: [
        {
          label: "Kabinet",
          items: [
          
            {
              label: "Xabarlar",
              icon: "pi pi-comment",

            },
             {
              label: "Sozlamalar",
              icon: "pi pi-cog",
              command: () => {
                this.$router.push("/admin/setting");
              },
            },
            {
              label: "Bloklash oynani",
              icon: "pi pi-lock",
              command: () => {
                this.$router.push("/login");
              },
            },
              {
              label: "Profil",
              icon: "pi pi-user",
              command: () => {
                this.$router.push("/admin/profil");
              },
            },
            {
              label: "Chiqish",
              icon: "pi pi-power-off",
              command: () => {
                this.$router.push("/login");
              },
            },
          ],
        },
      ],
      notefications: [
        {
          label: "Kiruvchi xatlar",
          subItems: [
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
            {
              label: "Xodimlarni ishga olish bo'yicha",
              icon: "pi pi-external-link",
              url: "https://vuejs.org/",
            },
            {
              label: "Intizomiy jazolarni qayta ko'rish",
              icon: "pi pi-upload",
              command: () => {
                this.$router.push("/login");
              },
            },
          ],
        },
      ],
    };
  },
  computed:{
    ...mapGetters(["get_menuType"]),
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    toggle2(event) {
      this.$refs.notefication.toggle(event);
    },
    poshGo(){
      this.$router.push("/admin")
    },
    controlNavbar() {
      this.$emit("controlSidebar");
    },
    changeTheme(theme, dark) {
      EventBus.emit("theme-change", { theme: theme, dark: dark });
    },
    admin_avatar(){
      return localStorage.getItem("admin_avatar")? localStorage.getItem("admin_avatar") : 'https://railwaynok.uz/img/avatar_20.4e17c1b7.jpg'
    }
  },
  created(){
    let dark = JSON.parse(localStorage.getItem('theme-dark'))
    if(dark){
      this.changeTheme("bootstrap4-dark-blue", true);
    }
    
  }
};
</script>
<style lang="scss" scoped>
.custom_bg{
  background-color: #313a46 !important;
  border-radius:0px !important;
  border: 1px solid #313a46;
  min-height: 62px;
}
.z_index_top {
  z-index: 998 !important;
}
.notefications_scroll::-webkit-scrollbar {
  width: 1px;
}
.logo-picture{
        width: 39px;
    }
</style>