<template >
  <div class="grid card surface-0 shadow-1 py-2 px-2">
    <h6 class="text-base p-2 uppercase">Hozirda ta'tildagi xodimlar</h6>
    <div class="col-12" v-show="!loader">
      <DataTable
        ref="dt"
        :value="vacation_cadryList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="grid">
            <div
              class="
                col-12
                xl:col-6
                lg:col-6
                md:col-6
                sm:col-6
              "
            >
              <InputText
                type="text"
                v-model="searchPartName"
                placeholder="Ism orqali qidiruv"
                class="p-inputtext-sm"
                @keyup.enter="searchByName()"
              />
            </div>

            <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-6 flex
                justify-content-end
                align-items-center">
              <Button
                icon="pi pi-plus"
                label="Qo'shish"
                class="p-button-info p-button-sm xl:ml-2 lg:ml-2"
                @click="addItemVacation()"
                v-tooltip.bottom="`Xodimni ta'tilga yuborish`"
              ></Button>
            </div>
           
          </div>
        </template>
        <Column header="" style="min-width: 30px; width: 40px">
          <template #body="slotProps">
            <div class="w-full text-center text-lg font-semibold">
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
                :src="slotProps.data.cadry.photo"
                :alt="slotProps.data.cadry.fullname"
                width="40"
                height="40"
                preview
              />
            </div>
          </template>
        </Column>
        <Column style="min-width: 16rem">
          <template #header>
            <div class="text-800 font-semibold">F.I.SH</div>
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
              "
            >
              {{ slotProps.data.cadry.fullname }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 150px; width: 200px">
          <template #header>
            <div class="text-800 font-semibold">Ta'til turi</div>
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
              "
            >
              {{ vacationName(slotProps.data.status_decret) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                text-center
                font-medium
              "
              :class="[slotProps.data.isFinished ? 'text-red-500' : '']"
            >
              {{ formatter.arrowDateFormat(slotProps.data.date1) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                text-center
                font-medium
              "
              :class="[slotProps.data.isFinished ? 'text-red-500' : '']"
            >
              {{ formatter.arrowDateFormat(slotProps.data.date2) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 200px; width: 300px">
          <template #header>
            <div class="text-800 font-semibold">Ta'til davri</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                text-center
                font-medium
                flex
                justify-content-evenly
              "
            >
              <div>{{ slotProps.data.period_date1? slotProps.data.period_date1: ""  }}</div>
              <div>{{ slotProps.data.period_date2? slotProps.data.period_date2: ""  }}</div>
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 80px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemVacation($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemVacation($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
            v-show="totalPage > 10"
            :total_page="totalPage"
            @pagination="changePagination($event)"
          ></table-pagination>
        </template>
      </DataTable>
    </div>
    <div class="col-12" v-show="loader">
      <vacation-loader></vacation-loader>
    </div>

    <div class="col-12">
      <Toast position="bottom-right" />
      <Dialog
        v-model:visible="med_dialog"
        :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <template #header>
          <h6 class="uppercase text-lg text-blue-500 font-medium">
            {{
              med_dialodType
                ? " Xodimni ta'tilga yuborish "
                : "Ta'til ma'lumotlarini tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Ta'til turini tanlang</h6>
            <Dropdown
              v-model="v$.status_decret.$model"
              :class="{ 'p-invalid': v$.status_decret.$invalid && submitted }"
              :options="vacationList"
              optionLabel="name"
              optionValue="id"
              placeholder="Tanlang"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Xodimni tanlang</h6>
            <Dropdown
              v-model="v$.cadry.$model"
              :class="{ 'p-invalid': v$.cadry.$invalid && submitted }"
              :options="search_cadryList"
              optionLabel="fullname"
              :filter="true"
              @filter="search_Cadry"
              placeholder="Tanlang"
              class="w-full"
            >
              <template #value="slotProps">
                <div class="font-semibold" v-if="slotProps.value">
                  <div>{{ slotProps.value.fullname }}</div>
                </div>
                <span v-else class="font-semibold">
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.fullname }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="v$.date1.$model"
              :class="{ 'p-invalid': v$.date1.$invalid && submitted }"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="v$.date2.$model"
              :class="{ 'p-invalid': v$.date2.$invalid && submitted }"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-12">
            <Divider align="center" type="dashed" class="py-0 my-0">
              <b class="font-medium text-500">Ta'til davri</b>
            </Divider>
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="period_date1"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="period_date2"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Prikaz raqami</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model="command_number"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditVacation(!v$.$invalid)"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import VacationLoader from "@/components/loaders/VacationLoader";
import TablePagination from "../components/Pagination/TablePagination.vue";
import formatter from "../util/formatter";
import DeleteButton from "../components/buttons/DeleteButton.vue";
import EditButton from "../components/buttons/EditButton.vue";
import VacationService from "../service/servises/VacationService";
import { globalValidate } from "../validation/vuevalidate";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  components: {
    EditButton,
    DeleteButton,
    TablePagination,
    VacationLoader,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      formatter,
      searchPartName: null,
      loader: false,

      vacation_cadryList: [],
      search_cadryList: [],
      vacationList: [],
      vacation_cadry_id: null,

      date1: "",
      date2: "",
      period_date1: "",
      period_date2: "",
      status_decret: "",
      command_number: "",
      cadry: "",
      alldays: 0,

      med_dialog: false,
      med_dialodType: true,

      params: {
        page: 1,
        per_page: 10,
        search:null,
      },

      search_params: {
        page: 1,
        per_page: 50,
        search: "A",
      },
      totalPage: 0,
      submitted: false,
    };
  },
  validations() {
    return {
      date1: globalValidate.date1,
      date2: globalValidate.date2,
      status_decret: globalValidate.status_decret,
      cadry: globalValidate.cadry,
    };
  },
  methods: {
    get_Vacations(params, loader) {
      this.controlLoader(loader);
      VacationService.get_CadryVacation(params)
        .then((res) => {
          this.totalPage = res.data.cadries.pagination.total;
          let cadrList = [];
          let number = (this.params.page - 1) * this.params.per_page;
          res.data.cadries.data.forEach((item) => {
            number++;
            item.number = number;
            cadrList.push(item);
          });
          this.vacation_cadryList = res.data.cadries.data;
          console.log(res.data.cadries.data);
          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_VacationList() {
      VacationService.get_VacationList()
        .then((res) => {
          this.vacationList = res.data.status_decret;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemVacation() {
      this.submitted = false;
      this.med_dialodType = true;
      this.status_decret = "";
      this.date1 = "";
      this.date2 = "";
      this.period_date1 = "";
      this.period_date2 = "";
      this.cadry = "";
      this.command_number = "";
      this.controlDialog(true);
    },

    editItemVacation(event) {
      this.submitted = false;
      this.med_dialodType = false;
      this.vacation_cadry_id = event.id;
      this.status_decret = event.status_decret;
      this.command_number = event.command_number ? event.command_number : "";
      this.date1 = this.formatter.interDateFormatter(event.date1);
      this.date2 = this.formatter.interDateFormatter(event.date2);
      this.period_date1 = event.period_date1
        ? this.formatter.interDateFormatter(event.period_date1)
        : "";
      this.period_date2 = event.period_date2
        ? this.formatter.interDateFormatter(event.period_date2)
        : "";
      this.cadry = event.cadry;
      this.controlDialog(true);
    },

    addAndEditVacation(valid) {
      this.submitted = true;
      if (valid) {
        this.controlDialog(false);
        let data = {
          command_number: this.command_number,
          status_decret: this.status_decret,
          cadry_id: this.cadry.id,
          period1: this.period_date1
            ? this.formatter.outDateFormatter(this.period_date1)
            : "",
          period2: this.period_date2
            ? this.formatter.outDateFormatter(this.period_date2)
            : "",
          date1: this.formatter.outDateFormatter(this.date1),
          date2: this.formatter.outDateFormatter(this.date2),
          alldays: this.countDay(this.date2, this.date1),
        };
        if (this.med_dialodType) {
          VacationService.create_CadryVacation({ data })
            .then((res) => {
            this.get_Vacations(this.params, false);
              this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Ta'tilga yuborildi",
                life: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          VacationService.update_CadryVacation({
            id: this.vacation_cadry_id,
            data,
          })
            .then((res) => {
                this.get_Vacations(this.params, false);
                this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Tahrirlandi",
                life: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    deleteItemVacation(id) {
      VacationService.delete_CadryVacation({ id })
        .then((res) => {
            this.get_Vacations(this.params, false);
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "O'chirildi",
            life: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changePagination(event) {
      this.params.page = event.page;
      this.params.per_page = event.per_page;
      this.get_Vacations(this.params, true);
    },
    vacationName(id) {
      return this.vacationList.length > 0
        ? this.vacationList.filter((item) => item.id == id)[0].name
        : "";
    },

    search_Cadry(event) {
      this.search_params.search = event.value;
      VacationService.search_Cadry(this.search_params)
        .then((res) => {
          this.search_cadryList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    searchByName(){
      this.params.search = this.searchPartName;
      this.get_Vacations(this.params, true);
    },

    countDay(date2, date1) {
      let mil_date2 = new Date(date2).getTime();
      let mil_date1 = new Date(date1).getTime();
      let distance = mil_date2 - mil_date1;
      return Math.round(distance / (1000 * 60 * 60 * 24));
    },

    controlDialog(item) {
      this.med_dialog = item;
    },
    controlLoader(item) {
      this.loader = item;
    },
  },
  created() {
    this.get_VacationList();
    this.get_Vacations(this.params, true);
    this.search_Cadry({ value: "a" });
  },
};
</script>
<style lang="">
</style>