<template >
  <div class="grid card surface-0 shadow-1 py-4 px-3">
    <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3 p-fluid">
      <h6>
        Katta korxonalar -
        {{
          bigOrganizationList.length
            ? bigOrganizationList.length - 1
            : bigOrganizationList.length
        }}
      </h6>
      <Dropdown
        id="adressDistrict"
        v-model="bigOrgValue"
        :options="bigOrganizationList"
        optionLabel="name"
        class="xl:p-inputtext-sm"
        :filter="true"
        placeholder="Tanlang"
        emptyMessage="Hech narsa topilmadi"
        emptyFilterMessage="Tizmda ma'lumot topilmadi..."
        @change="changeRailway"
      >
        <template #value="slotProps" class="custop_dropdown">
          <div class="max-w-100" v-if="slotProps.value">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="max-w-100">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
      <h6>
        Korxonalar -
        {{
          organizations.length ? organizations.length - 1 : organizations.length
        }}
      </h6>
      <Dropdown
        id="adressDistrict"
        v-model="orgValue"
        :options="organizations"
        optionLabel="name"
        @change="changeOrganization"
        :filter="true"
        placeholder=" Tanlang"
        class="w-full"
        emptyMessage="Hech narsa topilmadi"
        emptyFilterMessage="Tizmda ma'lumot topilmadi..."
      >
        <template #value="slotProps">
          <div
            class="country-item country-item-value w-full"
            v-if="slotProps.value"
          >
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item w-full">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
      <h6>
        Bo'limlar va bekatlar -
        {{
          departmentList.length
            ? departmentList.length - 1
            : departmentList.length
        }}
      </h6>
      <Dropdown
        id="adressDistrict"
        v-model="departmentValue"
        :options="departmentList"
        optionLabel="name"
        :filter="true"
        placeholder="Tanlang"
        class="w-full"
        @change="changeDepartment"
        emptyMessage="Hech narsa topilmadi"
        emptyFilterMessage="Tizmda ma'lumot topilmadi..."
      >
        <template #value="slotProps">
          <div
            class="country-item country-item-value w-full"
            v-if="slotProps.value"
          >
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item w-full">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
      <Button
        icon="pi pi-search "
        class="mt-5 w-10 p-button-secondary"
        @click="searchBtn()"
      />

      <Button
        icon="pi pi-filter"
        class="mt-5 w-2 p-button-text p-button-secondary"
        @click="openFilterPanel"
      />
      <!-- Additional filter menu -->
      <OverlayPanel
        ref="op"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '550px' }"
      >
        <div class="grid">
          <div class="col-12">
            <h6 class="text-sm uppercase">Qo'shimcha filter sozlamalari</h6>
          </div>

          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Lavozim {{ Stuffs.length }}</h6>
            </div>
            <div class="w-full flex">
              <Dropdown
                id="adressDistrict"
                v-model="stuffValue"
                :options="Stuffs"
                optionLabel="name"
                :filter="true"
                placeholder="Tanlang"
                :showClear="true"
                class="w-full p-inputtext-sm"
                @change="changeStuffs"
                emptyMessage="Hech narsa topilmadi"
                emptyFilterMessage="Tizmda ma'lumot topilmadi..."
                @before-show="beforeOpen"
                :disabled="Stuffs.length==0"
              >
                <template #value="slotProps">
                  <div
                    class="country-item country-item-value w-full"
                    v-if="slotProps.value"
                  >
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="country-item w-full">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Ma'lumoti</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <Dropdown
                  v-model="educationValue"
                  :options="educationList"
                  optionLabel="name"
                  placeholder="Tanlang"
                  class="w-full p-inputtext-sm"
                  @change="changeEducation"
                />
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Viloyat</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <Dropdown
                  v-model="regionValue"
                  :options="regionList"
                  optionLabel="name"
                  placeholder="Tanlang"
                  class="w-full p-inputtext-sm"
                  @change="changeRegion"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Ta'til</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <Dropdown
                  v-model="vacationValue"
                  :options="vacationList"
                  optionLabel="name"
                  placeholder="Ta'til"
                  class="w-full p-inputtext-sm"
                  @change="changeVacation"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Ism</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <InputText
                  type="text"
                  v-model="organization.first_name"
                  class="w-full font-semibold p-inputtext-sm"
                  placeholder="Kiriting"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Familiya</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <InputText
                  type="text"
                  v-model="organization.last_name"
                  class="w-full font-semibold p-inputtext-sm"
                  placeholder="Kiriting"
                />
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-1">Yosh oralig'i</h6>
              <p class="text-center text-blue-600 font-semibold">
                {{ selectedAge[0] + " -- " + selectedAge[1] }}
              </p>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <Slider
                  class=""
                  v-model="selectedAge"
                  :step="1"
                  :range="true"
                  @change="changeCadrAge"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="col-12">
              <h6 class="text-sm mb-0">Jinsi</h6>
            </div>
            <div class="w-full flex">
              <div class="w-full">
                <Dropdown
                  v-model="genderValue"
                  :options="genderList"
                  optionLabel="name"
                  placeholder="Tanlang"
                  class="w-full p-inputtext-sm"
                  @change="changeGender"
                />
              </div>
            </div>
          </div>
          <div class="col-12 flex justify-content-between align-items-center">
            <p class="text-left text-600 mb-0">
              Filter sozlamalar
            </p>
            <Tag
              class="cursor-pointer mr-4"
              value="Izlash"
              severity="info"
              icon="pi pi-search"
              @click="searchBtn()"
            ></Tag>
            <Tag
              class="cursor-pointer"
              value="Tozalash"
              severity="danger"
              icon="pi pi-filter-slash"
              @click="clearFilterDetails()"
            ></Tag>
          </div>
        </div>
      </OverlayPanel>
    </div>

    <!-- Employees table ---start -->
    <div class="col-12 pt-2" v-show="!loadingtable">
      <DataTable
        ref="dt"
        :value="cadries"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        v-show="totalCadries"
        stripedRows
      >
        <template #header>
          <div class="flex w-full">
            <h6 class="mb-2 md:m-0 uppercase py-2 px-3">
              Umumiy xodimlar (<span
                class="text-blue-500 font-semibold text-base"
                >{{ totalCadries }}</span
              >
              )
            </h6>
          </div>
        </template>
        <Column header="No">
          <template #body="slotProps">
            <div class="w-full text-center text-lg font-semibold">{{slotProps.data.number}}</div>
          </template>
        </Column>
        <Column header="Fotosurat">
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
        <Column field="name" header="F.I.SH" style="min-width: 16rem">
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-medium
              "
            >
             
              <div>{{ slotProps.data.fullname }}</div>
            </div>
          </template>
        </Column>

        <Column field="rating" header="Lavozimi" style="min-width: 20rem">
          <template #body="slotProps">
            <div
            class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
              "
            >
              {{ slotProps.data.staff? slotProps.data.staff.staff_full : `Tizimda ma'lumot yo'q` }}
            </div>
          </template>
        </Column>
        <Column field="rating" header="Korxona nomi" style="min-width: 16rem">
          <template #body="slotProps">
            <div
            class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-medium
              "
            >
              <span>{{ slotProps.data.organization.name }}</span>
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width:100px; width: 120px;">
          <template #body="slotProps">
            <div class="flex w-full align-items-center gap-2">
              <download-button  v-tooltip.left="`Ma'lumotlarni ko'rish`" :icon="'pi pi-id-card'"   @click="goPushDetails(slotProps.data.id)"></download-button>
              <download-button  v-tooltip.left="`Ma'lumotlarni yuklash`" :icon="'pi pi-cloud-download'" @click="DowloadResume(slotProps.data.id)"></download-button>
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
          v-show="totalCadries>10"
            :total_page="totalCadries"
            :page="organization.page"
            :per_page="organization.per_page"
            @pagination="changePagination($event)"
          ></table-pagination>
        </template>
      </DataTable>
      <search-not-found-page v-show="!totalCadries"></search-not-found-page>
    </div>
    <div class="col-12 pt-2" v-show="loadingtable">
      <employee-loader></employee-loader>
    </div>
    <div class="col-12">
      <Toast position="bottom-right" />
      <word-template :cadry_id="Dowload_cadry_id" v-show="false" ref="word_resume"></word-template>
    </div>
  </div>
</template>
<script>
import TablePagination from "../components/Pagination/TablePagination.vue";
import organizationsService from "../service/servises/organizationsService";
import globalFactoryService from "../service/servises/globalFactoryService";
import EmployeeLoader from "../components/loaders/EmployeeLoader.vue";
import SearchNotFoundPage from "../components/EmptyComponent/SearchNotFoundPage.vue";
import WordTemplate from "../components/Eksport/WordTemplate.vue";
import DownloadButton from '@/components/buttons/DownloadButton'
export default {
  components: { EmployeeLoader, TablePagination, SearchNotFoundPage,WordTemplate,DownloadButton },
  data() {
    return {
      displayBasic: true,
      loadingtable: false,
      selectedCadries: null,
      cadries: [],
      items: [
        {
          label: "Pdf",
          icon: "pi pi pi-copy",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Exel",
          icon: "pi pi pi-copy",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Printer",
          icon: "pi pi-print",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
      ],

      Dowload_cadry_id:null,

      selectedAge: [10, 80],

      // Organization
      bigOrganizationList: [],
      bigOrgValue: null, //fake
      organizations: [],
      orgValue: null, //fake
      departmentList: [],
      departmentValue: null, //fake
      Stuffs: [],
      stuffValue: null, //fake
      educationList: [],
      educationValue: null, //fake
      regionList: [],
      regionValue: null, //fake
      vacationList: [],
      vacationValue: null, //fake
      genderList:[
        {
          name:"Erkak",
          id:0
        },
        {
          name:"Ayol",
          id:1
        }
      ],
      genderValue:null, //fake
      selectedAge: [10, 80],


      totalCadries: 0,

      // Organization params
      organization: {
        railway_id: null,
        organization_id: null,
        department_id: null,
        page:localStorage.getItem("page_2")? Number(localStorage.getItem("page_2")) : 1,
        per_page:localStorage.getItem("per_page_2")? Number(localStorage.getItem("per_page_2")) : 10,
        last_name: null,
        first_name: null,
        middle_name: null,
        staff_id: null,
        sex: null,
        vacation_id: null,
        education_id: null,
        age_start: null,
        age_end: null,
        birth_region_id:null,
      },
    };
  },
  methods: {
    // get Global organization function
    getOrg(params) {
      this.controlLoading(true);
      console.table(params)
      globalFactoryService
        .getOrganization(params)
        .then((res) => {
          console.log(res.data.cadries);
          this.totalCadries = res.data.cadries.pagination.total;
          let cadrList =[];
          let number = (this.organization.page -1)*this.organization.per_page;
           res.data.cadries.data.forEach((item)=>{
            number++
            item.number= number
             cadrList.push(item)
          })
          this.cadries = res.data.cadries.data;
          this.controlLoading(false);
        })
        .catch((error) => {
          this.controlLoading(false);
          console.log(error);
        });
    },

    // get  Factory function
    get_Railway() {
      organizationsService
        .get_Railway()
        .then((res) => {
          if (res.data.length) {
            this.bigOrganizationList = res.data;
            this.bigOrganizationList.unshift({
              name: "Barchasi",
              id: null,
            });
          } else {
            this.bigOrganizationList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_Organization(id) {
      organizationsService
        .get_Organization({ railway_id: id })
        .then((res) => {
          if (res.data.length) {
            this.organizations = res.data;
            this.organizations.unshift({
              name: "Barchasi",
              id: null,
            });
          } else {
            this.organizations = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_Department(id) {
      organizationsService
        .getDepartment({ organization_id: id })
        .then((res) => {
          res.data.unshift({
            name: "Barchasi",
            id: null,
          });
          this.departmentList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_Stuffs(id){
      organizationsService
        .get_Staffs({ organization_id: id })
        .then((res) => {
          this.Stuffs = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_Education() {
      organizationsService
        .getEducation()
        .then((res) => {
          this.educationList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_getRegions() {
      organizationsService
        .getRegions()
        .then((res) => {
          this.regionList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_getVacations() {
      organizationsService
        .getVacations()
        .then((res) => {
          this.vacationList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },


    changeRailway(event) {
      this.organization.railway_id = event.value.id;
      this.get_Organization(event.value.id);
      this.organization.organization_id = null;
      this.organization.department_id = null;
      this.departmentList = [];
      this.departmentValue = null;
      this.orgValue = null;
      this.getOrg(this.organization);
    },

    changeOrganization(event) {
      this.organization.organization_id = event.value.id;
      this.organization.department_id = null;
      this.departmentValue = null;
      this.stuffValue = null;
      this.get_Department(event.value.id);
      this.get_Stuffs(event.value.id);
      this.getOrg(this.organization);
    },

    changeDepartment(event) {
      this.organization.department_id = event.value.id;
      this.getOrg(this.organization);
    },

    changeStuffs(event) {
      this.organization.staff_id = event.value.id;
    },
    changeEducation(event) {
      this.organization.education_id = event.value.id;
    },
    changeRegion(event) {
      this.organization.birth_region_id = event.value.id

    },

    changeCadrAge(event){
      this.organization.age_start = event[0]
      this.organization.age_end = event[1]
    },
    changeGender(event){
      this.organization.sex = event.value.id;
    },

    changeVacation(event) {
      this.organization.vacation_id = event.value.id;
    },
    changePagination(event) {
      this.organization.page = event.page;
      this.organization.per_page = event.per_page;
      localStorage.setItem("page_2", event.page)
      localStorage.setItem("per_page_2", event.per_page)
      this.getOrg(this.organization);
    },

    searchBtn() {
      console.table(this.organization);
      this.getOrg(this.organization);
    },

    // Dowload resume
    DowloadResume(id){
      console.table(id);
     this.$refs.word_resume.generateWord(id)
    },
    goPushDetails(id) {
      this.$router.push(`/admin/employee/view/${id}`);
    },

    beforeOpen(event){
      console.log(event);
    },
    // clear additional filter details
    clearFilterDetails() {
      this.organization.staff_id = null;
      this.stuffValue = null;
      this.organization.education_id = null;
      this.educationValue = null;
      this.organization.vacation_id = null;
      this.vacationValue = null;
      this.organization.first_name = null;
      this.organization.last_name = null;
      this.organization.middle_name = null;
      this.organization.age_end = null;
      this.organization.age_start = null;
      this.organization.sex =null;
      this.organization.birth_region_id = null,
      this.regionValue = null,
      this.genderValue = null;
      this.selectedAge = [10,80]
      this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tozalandi",
        life: 2000,
      });
    },

    openFilterPanel(event) {
      this.$refs.op.toggle(event);
    },
    controlLoading(item) {
      this.loadingtable = item;
    },
  },
  created() {
    this.getOrg(this.organization);
    this.get_Railway();
    this.get_Education();
    this.get_getRegions();
    this.get_getVacations();
  },
};
</script>
<style lang="scss">



</style>