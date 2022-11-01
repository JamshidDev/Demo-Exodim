<template lang="">
    <div class="grid card surface-0 shadow-1 py-4 px-3">
        <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-3">
            <div class="grid">
              <div class="col-12">
                <div class="flex justify-content-center pb-2"><Avatar :image="admin_avatar()" size="xlarge" class="mr-2" shape="circle" /></div>
                <h6  class="text-center xl:text-lg font-medium uppercase mb-6" >{{get_Name()}}</h6>
              </div>
               
                <!-- <div class="col-12">
                  <PanelMenu :model="items" />
                </div> -->
            </div>
        </div>

        <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-9">
            
        </div>
    </div>
</template>
<script>
 import ActiveSeans from '../components/ProfilComponent/ActiveSeans.vue';

export default {
    components:{
        ActiveSeans,
    },
  data() {
    return {
      items: [
        {
          label: "Profil menyu",
          icon: "pi pi-shield",
        },
        {
          label: "Profil menyu",
          icon: "pi pi-shield",
        },
        {
          label: "Profil menyu",
          icon: "pi pi-shield",
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    admin_avatar(){
      return localStorage.getItem("admin_avatar")? localStorage.getItem("admin_avatar") : 'https://railwaynok.uz/img/avatar_20.4e17c1b7.jpg'
    },
    get_Name(){
      let profile = JSON.parse(localStorage.getItem("profil"))
      return profile.name
    },
  },
};
</script>
<style lang="scss" scoped>
.p-avatar-xl {
  width: 180px;
  height: 180px;
}
.p-button-icon {
  font-size: 1.6rem !important;
}


::v-deep(.p-scrollpanel) {
    p {
        padding: .5rem;
        line-height: 1.5;
        margin: 0;
    }

    &.custombar1 {
        .p-scrollpanel-wrapper {
            border-right: 9px solid var(--surface-ground);
        }

        .p-scrollpanel-bar {
            background-color: var(--primary-color);
            opacity: 1;
            transition: background-color .2s;

            &:hover {
                background-color: #007ad9;
            }
        }
    } 
}
</style>