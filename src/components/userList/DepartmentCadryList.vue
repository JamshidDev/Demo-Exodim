<template>
  <div class="grid card surface-0 shadow-1 py-2 px-2">
    <div class="col-12 flex justify-content-start py-0 mb-4">
      <Button
        icon="pi pi-arrow-circle-left"
        @click="goPush()"
        class="p-button-secondary p-button-rounded p-button-sm"
        v-tooltip.right="`Orqaga`"
      />
    </div>

    <div class="col-12" v-show="!loader">
      <DataTable
        ref="dt"
        :value="cadryList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
        v-show="totalCadries"
      >
        <template #header>
          <div class="grid">
            <div class="col-12 xl:col-6 lg:col-6 md:col-6">
              <h6 class="font-medium text-lg uppercase">
                <span class="text-blue-600">{{ department_name }}</span>
                bo'limidagi xodimlar ro'yhati
              </h6>
            </div>
            <div
              class="
                col-12
                xl:col-6
                lg:col-6
                md:col-6
                flex
                justify-content-end
                align-items-center
              "
            >
              <InputText
                type="text"
                v-model="searchPositionName"
                placeholder="Ism orqali qidiruv"
                class="p-inputtext-sm"
                @keyup.enter="searchByName()"
              />
            </div>
          </div>
        </template>
        <Column header="" style="min-width: 30px; width: 40px">
          <template #body="slotProps">
            <div class="w-full text-center font-medium">
              {{ slotProps.data.number }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 60px; width: 60px">
          <template #header>
            <div class="text-800 font-semibold">Rasm</div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-content-center">
              <Image
                :src="slotProps.data.photo"
                :alt="slotProps.data.fullname"
                width="40"
                height="40"
                preview
              />
            </div>
          </template>
        </Column>

        <Column style="min-width: 200px; width: 300px">
          <template #header>
            <div class="text-800 font-semibold">F.I.O</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-medium
                text-left
              "
            >
              {{ slotProps.data.fullname }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 16rem">
          <template #header>
            <div class="text-800 font-semibold">To'liq shtat lavozim nomi</div>
          </template>
          <template #body="slotProps">
            <div class="text-sm sm:text-sm md:text-md lg:text-lg">
              {{ slotProps.data.staff.staff_full }}
            </div>
          </template>
        </Column>
        <Column  style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Faoliyat turi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                w-full
                text-green-500 text-center text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-medium  "
            >
              {{ slotProps.data.staff.staff_status }}
            </div>
          </template>
        </Column>
        <Column  style="min-width: 50px; width: 50px">
          <template #header>
            <div class="text-800 font-semibold">Stavkasi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                w-full
                text-center text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-medium  "
            >
              {{ slotProps.data.staff.rate }}
            </div>
          </template>
        </Column>

        <Column  style="min-width: 180px; width: 200px">
          <template #header>
            <div class="text-800 font-semibold">Ta'til</div>
          </template>
          <template #body="slotProps">
            <div v-show="slotProps.data.staff.status_vacation !=3 " class="bg-yellow-500">
              {{checkVacation(slotProps.data.staff.status_vacation)}}
            </div>
            <div v-show="slotProps.data.staff.status_vacation == 3">
              {{checkVacation(slotProps.data.staff.status_vacation)}} 
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 60px; width: 60px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <!-- <view-button-v
                  v-tooltip.bottom="`Xodimlarni ko'rish`"
                  :icon="'pi-users'"
                ></view-button-v> -->
              <edit-button
                :editItem="slotProps.data.id"
                @editEvent="editItem($event)"
              ></edit-button>
              <!-- <delete-button
                  :deleteItem="slotProps.data.id"
                  @deleteAcceptEvent="deletePosition($event)"
                ></delete-button> -->
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
            v-show="totalCadries > 10"
            :total_page="totalCadries"
            @pagination="changePagination($event)"
          ></table-pagination>
        </template>
      </DataTable>
      <!-- <div class="col-12" v-show="!totalCadries">
        <div class="grid">
          <div class="col-12">
            <h6 class="font-medium text-lg">
              <span class="text-blue-600">{{ department_name }}</span>
              bo'limidagi xodimlar ro'yhati
            </h6>
          </div>
          <div class="col-12">
            <div class="text-center w-full text-400">Xodimlar topilmadi</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="col-12" v-show="loader">
      <user-list-loader></user-list-loader>
    </div>
  </div>
</template>
  <script>
import DepartmentService from "../../service/servises/DepartmentService";
import UserListLoader from "../loaders/UserListLoader.vue";
import EditButton from "../buttons/EditButton.vue";
import TablePagination from "../Pagination/TablePagination.vue";
export default {
  components: {
    UserListLoader,
    EditButton,
    TablePagination,
  },
  data() {
    return {
      department_name: null,
      vacationList:[],
      loader: false,
      cadryList: [],
      totalCadries: 0,
      params: {
        page: 1,
        per_page: 10,
      },
    };
  },
  methods: {
    get_DepartmentCadry(id, params, loader) {
      this.controlLoader(loader);
      DepartmentService.get_DepartmentCadry({ id, params }).then((res) => {
        this.totalCadries = res.data.cadries.pagination.total;
        this.vacationList = res.data.status_vacation;
        let number = (this.params.page - 1) * this.params.per_page;
        res.data.cadries.data.forEach((item) => {
          number++;
          item.number = number;
        });
        this.cadryList = res.data.cadries.data;
        this.controlLoader(false);
        console.log(res.data.cadries);
      });
    },

    changePagination(event){
      this.params.page = event.page;
      this.params.per_page = event.per_page
      this.get_DepartmentCadry(this.$route.params.id, this.params, true);
    },


    goPush() {
      this.$router.push("/admin/partfactory");
    },
    editItem(id){
      this.$router.push(`/admin/editemployee/${id}`)
    },
    checkVacation(id){
     return this.vacationList.filter((item)=>item.id == id)[0].name
    },
    controlLoader(item) {
      this.loader = item;
    },
  },
  created() {
    this.department_name = this.$route.params.name;
    this.get_DepartmentCadry(this.$route.params.id, this.params, true);
  },
};
</script>
  <style lang="scss">
</style>