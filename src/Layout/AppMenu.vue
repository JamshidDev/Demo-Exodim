<template >
  <div class="w-full sidebar_box custom_bg">
    <Menu
      :model="item"
      class="w-full sidebar_menu custom_bg px-2 pb-8 border-none border-noround"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      item:[
        {
          label: "Global",
          icon: "pi pi-globe",
          visible: () =>this.get_TitlePermission(["management_statistics","management_organizations" ]),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-chart-pie",
              to: '/admin/statistic',
              visible: () =>this.get_adminPermissions("management_statistics"),
            },
            {
              label: "Korxonalar",
              icon: "pi pi-building",
              visible: () =>this.get_adminPermissions("management_organizations"),
              to: '/admin/employees',
            },
          ],
        },
        {
          label: "Asosiy",
          icon: "pi pi-microsoft",
          visible: () =>this.get_TitlePermission(["organization_statistics","organization_cadries", "organization_departments" ,"organization_staffs", "organization_archive" ]),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-chart-pie",
              to: '/admin/partstatistic',
              visible: () =>this.get_adminPermissions("organization_statistics"),
            },
            {
              label: "Xodimlar",
              icon: "pi pi-users",
              to: '/admin/partemployee',
              visible: () =>this.get_adminPermissions("organization_cadries"),
            },
            {
              label: "Bo'limlar",
              icon: "pi pi-sitemap",
              to: '/admin/partfactory',
              visible: () =>this.get_adminPermissions("organization_departments"),
            },
            {
              label: "Shtat lavozimlari",
              icon: "pi pi-align-center",
              to: '/admin/position',
              visible: () =>this.get_adminPermissions("organization_staffs"),
            },
            {
              label: "Arxiv",
              icon: "pi pi-shield",
              to: '/admin/historyemployee',
              visible: () =>this.get_adminPermissions("organization_archive"),
            },
          ],
        },
        {
          label: "Monitoring",
          icon: "pi pi-th-large",
          visible: () =>this.get_TitlePermission(["organization_vacations","organization_meds","organization_discips", "organization_incentives" ]),
          
          items: [
            {
              label: "Ta'tillar",
              icon: "pi pi-calendar",
              visible: () =>this.get_adminPermissions("organization_vacations"),
              to: '/admin/vacation',
            },
            {
              label: "Tibbiy ko'rik",
              icon: "pi pi-id-card",
              visible: () =>this.get_adminPermissions("organization_meds"),
              to: '/admin/meds',
            },
            {
              label: "Jazolanganlar",
              icon: "pi pi-th-large",
              visible: () =>this.get_adminPermissions("organization_discips"),
              to: '/admin/punishment',
            },
            {
              label: "Mukofatlanganlar",
              icon: "pi pi-star",
              visible: () =>this.get_adminPermissions("organization_incentives"),
              to: '/admin/incentive',
            },
          ],
        },
        {
          label: "Xavsizlik",
          icon: "pi pi-shield",
          visible: () =>this.get_adminPermissions("admin"),
          items: [
            {
              label: "Ma'sullar",
              icon: "pi pi-user",
              to: '/admin/superadmin',
              visible: () =>this.get_adminPermissions("admin"),
            },
            {
              label: "Kirishlar",
              icon: "pi pi-book",
              visible: () =>this.get_adminPermissions("admin"),
            },
            {
              label: "Amallar",
              icon: "pi pi-shield",
              visible: () =>this.get_adminPermissions("admin"),
            },
          ],
        },
        {
          label: "Platforma",
          icon: "pi pi-prime",
          items: [
            {
              label: "Qo'llanma",
              icon: "pi pi-book",
            },
          ],
        },
        
      ],

    };
  },
  computed:{
    ...mapGetters(["get_adminPermissions","get_TitlePermission"])
  },
};
</script>
<style lang="scss">
.sidebar_box{
  & .p-menu {
    background-color: #313a46 !important;
  }
}

  
  .sidebar_box {
      height:calc(100vh - 58px) ;
    max-height: calc(100vh - 58px);
    overflow-y: auto !important;
  }
  .sidebar_box::-webkit-scrollbar {
    width: 4px;
    scrollbar-color: #6969dd;
  }
  .sidebar_menu {
    min-height: calc(100vh - 58px);
    .p-menuitem {
      font-weight: 500;
      outline-width: 10px;
     
    }
   
    .p-menuitem-icon {
      padding-right: 10px;
    }
    .p-menuitem-text{
      color: #aeb2b5 !important;
      text-transform: uppercase;
      font-weight: 500;
    }
  .p-menuitem-link:hover{
    background: #185491e0 !important;
  }
    .p-submenu-header {
      color: #808c99;
      font-weight: 500;
      background-color: transparent;
    }
    .p-menuitem-link:focus {
      border-radius: 6px;
      background: #185491e0 !important;
    }
    .p-menuitem-link:visited{
      border-radius: 6px;
      background: #185491e0 !important;
    }
    .router-link-active{
      border-radius: 6px;
      background: #185491e0 !important;
      .p-menuitem-icon, .p-menuitem-text{
        color:#fff !important;
      }
    }
    .p-menuitem-link:visited{
      border-radius: 6px;
      background: #185491e0 !important;
    }
  }
  
  .sidebar_menu {
    width: 100%;
  }
</style>