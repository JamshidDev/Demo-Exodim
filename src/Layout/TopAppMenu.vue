<template>
  <div class="w-full">
    <Menubar :model="item" class=" font-medium " />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      permissionList: [
        // super admin
        {
          name: "role-list",
          permissions: {
            label: "Global",
            icon: "pi pi-globe",
            items: [],
          },
        },
        // basic admin
        {
          name: "role-list",
          permissions: {
            label: "Asosiy",
            icon: "pi pi-microsoft",
            items: [],
          },
        },
        // message admin
        {
          name: "message_admin",
          permissions: {
            label: "Xabarlar",
            icon: "pi pi-th-large",
            items: [],
          },
        },
        // control admin
        {
          name: "control_admin",
          permissions: {
            label: "Platforma",
            icon: "pi pi-prime",
            items: [],
          },
        },
      ],

      // Child permissions
      childPermissions: [
        // global menu items
        [
          {
            name: "role-list",
            permission: {
              label: "Statistika",
              icon: "pi pi-slack",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Korxonalar",
              icon: "pi pi-search",
              command: () => {
                this.$router.push("/admin/employees");
              },
            },
          },
          // {
          //   name: "global_factory",
          //   permission: {
          //     label: "Sms tizimi",
          //     icon: "pi pi-envelope",
          //     command: () => {
          //       this.$router.push("/admin/companies");
          //     },
          //   },
          // },
        ],
        // basic menu items
        [
          {
            name: "role-list",
            permission: {
              label: "Statistika",
              icon: "pi pi-slack",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Xodimlar",
              icon: "pi pi-users",
              command: () => {
                this.$router.push("/admin/partemployee");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Bo'limlar",
              icon: "pi pi-sitemap",
              command: () => {
                this.$router.push("/admin/partfactory");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Shtat lavozimlari",
              icon: "pi pi-align-center",
              command: () => {
                this.$router.push("/admin/position");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Tibbiy ko'rik",
              icon: "pi pi-box",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Ta'tillar",
              icon: "pi pi-briefcase",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Arxiv",
              icon: "pi pi-shield",
              command: () => {
                this.$router.push("/admin/historyemployee");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Rag'batlantirilganlar",
              icon: "pi pi-star",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "role-list",
            permission: {
              label: "Hududlar",
              icon: "pi pi-map",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
        ],
         //  message menu items
        [
         
          {
            name: "message_offer",
            permission: {
              label: "Takliflar",
              icon: "pi pi-comment",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "message_enter_msg",
            permission: {
              label: "Kiruvchi xatlar",
                  icon: "pi pi-envelope",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
          {
            name: "message_out_msg",
            permission: {
              label: "Chiquvchi xatlar",
                  icon: "pi pi-envelope",
              command: () => {
                this.$router.push("/admin/statistic");
              },
            },
          },
        ],
         //  control menu items
         [
         
         {
           name: "control_login",
           permission: {
            label: "Masullar",
                  icon: "pi pi-folder",
             command: () => {
               this.$router.push("/admin/statistic");
             },
           },
         },
         {
           name: "control_action",
           permission: {
            label: "Amallar",
                  icon: "pi pi-folder",
             command: () => {
               this.$router.push("/admin/statistic");
             },
           },
         },
         {
           name: "control_history",
           permission: {
            label: "Tarix",
                  icon: "pi pi-folder",
             command: () => {
               this.$router.push("/admin/statistic");
             },
           },
         },
       ],
      ],
      menuBarRouter: [
        {
          label: "Global",
          icon: "pi pi-globe",
          visible: () => this.get_adminPermissions("role-list"),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-slack",
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
          visible: () =>this.get_adminPermissions("role-list"),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-slack",
              to: '/admin/statistic',
              visible: () =>this.get_adminPermissions("role-list"),
            },
            {
              label: "Xodimlar",
              icon: "pi pi-users",
              to: '/admin/partemployee',
              visible: () =>this.get_adminPermissions("role-list"),
            },
            {
              label: "Bo'limlar",
              icon: "pi pi-sitemap",
              to: '/admin/partfactory',
              visible: () =>this.get_adminPermissions("role-list"),
            },
            {
              label: "Shtat lavozimlari",
              icon: "pi pi-align-center",
              to: '/admin/position',
              visible: () =>this.get_adminPermissions("role-list"),
            },
            {
              label: "Arxiv",
              icon: "pi pi-shield",
              to: '/admin/historyemployee',
              visible: () =>this.get_adminPermissions("role-list"),
            },
            {
              label: "Boshqalar",
              icon: "pi pi-box",
              visible: () =>this.get_adminPermissions("role-lists"),
              items: [
                {
                  label: "Rag'batlantirilganlar",
                  icon: "pi pi-star",
                  to: '/admin/position',
              visible: () =>this.get_adminPermissions("role-list"),
                },
                {
                  label: "Hududlar",
                  icon: "pi pi-map",
                  to: '/admin/position',
              visible: () =>this.get_adminPermissions("role-list"),
                },
              ],
            },
          ],
        },
        {
          label: "Monitoring",
          icon: "pi pi-th-large",
          items: [
            {
              label: "Ta'tillar",
              icon: "pi pi-th-large",
              visible: () =>this.get_adminPermissions("management_organizations"),
              to: '/admin/vacation',
            },
            {
              label: "Tibbiy ko'rik",
              icon: "pi pi-th-large",
              visible: () =>this.get_adminPermissions("management_organizations"),
              to: '/admin/meds',
            },
            {
              label: "Boshqalar",
              icon: "pi pi-th-large",
              items: [
              {
                  label: "Jazolar",
                  icon: "pi pi-th-large",
                  to:"/admin/punishment",
                },
                {
                  label: "Mukofot",
                  icon: "pi pi-th-large",
                  to:"/admin/incentive",
                },
                {
                  label: "Hududlar",
                  icon: "pi pi-th-large",
                  to:"/admin/punishment",
                },
              ],
            },
          ],
        },
        {
          label: "Platforma",
          icon: "pi pi-prime",
          items: [
            {
              label: "Qo'shimchalar",
              icon: "pi pi-shield",
              items: [
                {
                  label: "Masullar",
                  icon: "pi pi-shield",
                  to:"/admin/superadmin",
                },
                {
                  label: "Kirishlar",
                  icon: "pi pi-shield",
                },
                {
                  label: "Amallar",
                  icon: "pi pi-shield",
                },
              ],
            },
            {
              label: "Sozlamalaar",
              icon: "pi pi-cog",
              command: () => {
                this.$router.push("/admin/setting");
              },
            },
            {
              label: "Qo'llanma",
              icon: "pi pi-book",
            },
            {
              label: "Versiya",
              icon: "pi pi-prime",
            },
          ],
        },
      ],
      customBarRouter: [],
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
  methods: {
   async generateBarRouter() {
     await this.permissionList.forEach((item, index) => {
        if (this.get_adminPermissions(item.name)) {
          this.childPermissions[index].forEach((childItem, childIndex) => {
            if (this.get_adminPermissions(childItem.name)) {
              item.permissions.items.push(childItem.permission);
            }
          });
          this.customBarRouter.push(item.permissions);
        }
      });

      // console.log(this.customBarRouter);
    },
    get_Permission(arrey, permission) {
      if (arrey.length > 0) {
        return arrey.includes(permission);
      } else {
        return false;
      }
    },
    isUserAdmin(){
      return false
    }
  },
  created() {
    this.generateBarRouter();
  },
};
</script>
<style lang="">
</style>