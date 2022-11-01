<template >
  <div class="grid card surface-0 shadow-1 py-2 px-2">
    <h6 class="text-base p-2 uppercase">Tibbiy ko'rik</h6>
    <div class="col-12" v-show="!loader">
      <DataTable
        ref="dt"
        :value="medList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <InputText
                type="text"
                v-model="searchCadryName"
                placeholder="Ism orqali qidiruv"
                class="p-inputtext-sm"
                @keyup.enter="searchByName()"
              />
            </div>
            <div class="col-6 flex justify-content-end">
              <Button
                icon="pi pi-plus"
                label="Qo'shish"
                class="p-button-info p-button-sm"
                @click="addItemMed()"
                v-tooltip.bottom="`Yangi tibbiy ko'rik qo'shish`"
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
                :src="slotProps.data.photo"
                :alt="slotProps.data.fullname"
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
              {{ slotProps.data.fullname }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 100px; width: 150px">
          <template #header>
            <div class="text-800 font-semibold">Status</div>
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
              <div
                v-show="slotProps.data.days <= 0"
                class="w-full text-center text-red-500"
              >
                <Tag
                  class="mr-2"
                  icon="pi pi-info-circle"
                  severity="danger"
                  value="Tugagan"
                ></Tag>
              </div>
              <div
                v-show="slotProps.data.days <= 10 && slotProps.data.days > 0"
                class="w-full text-center"
              >
                {{ slotProps.data.days }} kun qoldi
              </div>
              <div
                v-show="slotProps.data.days > 10"
                class="w-full text-center"
              >
                {{ slotProps.data.days }} kun qoldi
              </div>
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Oxirgi sana</div>
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
            <div class="text-800 font-semibold">Keyingi sana</div>
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

        <Column style="min-width: 120px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <text-button
                :text="'Yangilash'"
                @click="refreshItem(slotProps.data)"
              ></text-button>
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
      <med-loader></med-loader>
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
            Tibbiy ko'rik hulosasini qo'shish
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Xodimni tanlang</h6>
            <Dropdown
              id="positionPart"
              v-model="med_fullName"
              :options="med_cadryList"
              optionLabel="fullname"
              :filter="true"
              placeholder="Tanlang"
              class="w-full"
              :class="{ 'p-invalid': cadry_Error && med_submitted }"
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
            <h6 class="mb-2 pl-2 text-500">Oxirgi o'tgan sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="med_date1"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              :class="{ 'p-invalid': cadry_Date1 && med_submitted }"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Keyingi o'tish sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="med_date2"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              :class="{ 'p-invalid': cadry_Date2 && med_submitted }"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Izoh</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="med_comment"
              :autoResize="true"
              rows="1"
              :class="{ 'p-invalid': cadry_Comment && med_submitted }"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="AddMed()"
              />
            </div>
          </div>
        </template>
      </Dialog>
      <Dialog
        v-model:visible="new_dialog"
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
          <h6 class="uppercase text-lg text-green-500 font-medium">
            Tibbiy ko'rik hulosasini yangilash
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Oxirgi o'tgan sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="refresh_date1"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              :class="{ 'p-invalid': cadry_ref_date1 && refresh_submitted }"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Keyingi o'tish sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="refresh_date2"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              :class="{ 'p-invalid': cadry_ref_date2 && refresh_submitted }"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Izoh</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="refresh_comment"
              :autoResize="true"
              rows="1"
              :class="{ 'p-invalid': cadry_ref_comment && refresh_submitted }"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="refreshMed()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import TextButton from "../components/buttons/TextButton.vue";
import TablePagination from "../components/Pagination/TablePagination.vue";
import medService from "../service/servises/medService";
import VacationService from "@/service/servises/VacationService";
import MedLoader from "../components/loaders/MedLoader.vue";
import formatter from "../util/formatter";
export default {
  components: {
    TextButton,
    TablePagination,
    MedLoader,
  },
  data() {
    return {
      loader: false,
      medList: [],
      formatter,
      med_submitted: false,
      med_cadryList: [],
      med_date1: "",
      med_date2: "",

      med_comment: "",
      med_fullName: "",

      med_dialog: false,
      new_dialog: false,
      refresh_date1: "",
      refresh_date2: "",
      refresh_comment: "",
      refresh_cadry_id: null,
      refresh_submitted: false,

      totalPage: 0,
      params: {
        page: 1,
        per_page: 10,
        search:null,
      },
      searchCadryName: null,
      search: {
        search: "",
        page: 1,
        per_page: 1000,
      },
    };
  },
  computed: {
    cadry_Error() {
      if (!this.med_fullName) {
        return true;
      } else {
        return false;
      }
    },
    cadry_Date1() {
      if (!this.med_date1) {
        return true;
      } else {
        return false;
      }
    },
    cadry_Date2() {
      if (!this.med_date2) {
        return true;
      } else {
        return false;
      }
    },
    cadry_Comment() {
      if (!this.med_comment) {
        return true;
      } else {
        return false;
      }
    },
    cadry_ref_date1() {
      if (!this.refresh_date1) {
        return true;
      } else {
        return false;
      }
    },
    cadry_ref_date2() {
      if (!this.refresh_date2) {
        return true;
      } else {
        return false;
      }
    },
    cadry_ref_comment() {
      if (!this.refresh_comment) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    get_MedList(params, loader) {
      this.controlLoader(loader);
      medService
        .get_CadryMed(params)
        .then((res) => {
          console.log(res.data.cadries.data);
          this.totalPage = res.data.cadries.pagination.total;
          let number = (this.params.page - 1) * this.params.per_page;
          res.data.cadries.data.forEach((item) => {
            number++;
            item.number = number;
          });

          this.medList = res.data.cadries.data;
          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addItemMed() {
      this.med_dialodType = true;
      this.med_submitted = false;
      this.med_date1 = "";
      this.med_date2 = "";
      this.med_comment = "";
      this.med_fullName = "";
      this.controlDialog(true);
    },
    AddMed() {
      this.med_submitted = true;
      if (
        !this.cadry_Comment &&
        !this.cadry_Date1 &&
        !this.cadry_Date2 &&
        !this.cadry_Error
      ) {
        let data = {
          cadry_id: this.med_fullName.id,
          date1: formatter.outDateFormatter(this.med_date1),
          date2: formatter.outDateFormatter(this.med_date2),
          result: this.med_comment,
        };
        medService.create_CadryMed({ data }).then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "Yaratildi",
            life: 2000,
          });
        });
        this.controlDialog(false);
      }
    },
    deleteItemMed(id) {},
    changePagination(event) {
      this.params.page = event.page;
      this.params.per_page = event.per_page;
      this.get_MedList(this.params, true);
    },
    refreshItem(item) {
      this.refresh_submitted = false;
      this.refresh_cadry_id = item.id;
      this.refresh_date1 = formatter.interDateFormatter(item.date1);
      this.refresh_date2 = formatter.interDateFormatter(item.date2);
      this.refresh_comment = "";
      this.refresh_cadry_id = item.cadry_id;
      this.controlNewDialog(true);
    },
    refreshMed() {
      this.refresh_submitted = true;
      if (
        !this.cadry_ref_comment &&
        !this.cadry_ref_date1 &&
        !this.cadry_ref_date2
      ) {
        let id = this.refresh_cadry_id;
        let data = {
          date1: formatter.outDateFormatter(this.refresh_date1),
          date2: formatter.outDateFormatter(this.refresh_date2),
          result: this.refresh_comment,
        };
        medService.update_CadryMed({ id, data }).then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "Yangilandi",
            life: 2000,
          });
        });
        console.table(data);

        this.controlNewDialog(false);
      }
    },

    searchCadry(params) {
      VacationService.search_Cadry(params)
        .then((res) => {
          this.med_cadryList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByName() {
      this.params.search = this.searchCadryName;
      this.get_MedList(this.params, false);

    },

    controlDialog(item) {
      this.med_dialog = item;
    },
    controlNewDialog(item) {
      this.new_dialog = item;
    },
    controlLoader(item) {
      this.loader = item;
    },
  },
  created() {
    this.get_MedList(this.params, true);
    this.searchCadry(this.search);
  },
};
</script>
<style lang="">
</style>