<template >
   <div class="grid card py-4" v-if="barLoader">
    <div class="col-12">
      <progress-bar-loader></progress-bar-loader>
    </div>
  </div>
  <div class="grid card xl:p-4 lg:p-2 pt-4 px-0" v-if="!barLoader">

    <div class="col-12 pt-1 mb-2">
      <div class="grid">
        <div
          class="
            col-12
            text-left text-base
            font-medium
            uppercase
            mb-2
            text-blue-600
          "
        >
          Akademik ma'lumotlari
        </div>

        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Malumoti</h6>
              <Dropdown
                id="academic"
                v-model="academic"
                :options="educationList"
                optionLabel="name"
                optionValue="id"
                placeholder="Malumoti tanlang"
                class="w-full font-semibold"
              />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Ilmiy darajasi</h6>
              <Dropdown
                id="academicDegree"
                v-model="academicDegree"
                :options="academikDegreeList"
                optionLabel="name"
                optionValue="id"
                placeholder="Darajani tanlang"
                class="w-full font-semibold"
              />
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Ilmiy unvoni</h6>
              <Dropdown
                id="academicTitle"
                v-model="academicTitle"
                :options="academikTitleList"
                optionLabel="name"
                optionValue="id"
                placeholder="Unvonni tanlang"
                class="w-full font-semibold"
              />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Millati</h6>
              <Dropdown
                id="employeeNation"
                v-model="employeeNation"
                optionValue="id"
                :options="nationalList"
                optionLabel="name"
                placeholder="Millatni tanlang"
                class="w-full font-semibold"
              />
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Xarbiy unvoni</h6>
              <InputText
                type="text"
                class="w-full font-semibold"
                placeholder="Unvonni kiriting"
                id="employeeMilitaryTitle"
                v-model="employeeMilitaryTitle"
              />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Chet tillari</h6>
              <MultiSelect class="w-full font-semibold" v-model="employeeLanguage" :options="languagesList"  optionLabel="name" placeholder="Tilni tanlang" />
             
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Saylangan organlarga a'zoligi</h6>
              <InputText
                type="text"
                class="w-full font-semibold"
                placeholder="Azoligini kiriting"
                id="employeeSelectedOrgan"
                v-model="employeeSelectedOrgan"
              />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Partiyaviyligi</h6>
              <Dropdown
                id="employeeParty"
                v-model="employeeParty"
                :options="Party"
                optionLabel="name"
                optionValue="id"
                placeholder="Partiyani tanlang"
                class="w-full font-semibold"
              />
            </div>
          </div>
        </div>
        <div class="col-12 flex justify-content-end">
          <Button
            icon="pi pi-save"
            @click="update_Info()"
            class="p-button-secondary p-button-sm"
            label="Saqlash"
            v-tooltip.bottom="`Ma'lumotlarni saqlash`"
          />
        </div>
      </div>
    </div>


    <!-- Uneversity table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="universityList.length==0">
      <add-button :title="'Oligoh ma\'lumotlarni qo\'shish'" @click="addItemUniversity()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!universityList.length==0">
      <DataTable
        :value="universityList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Oligoh ma'lumotlari
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItemUniversity()"
              />
            </div>
          </div>
        </template>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date1 }}
            </div>
          </template>
        </Column>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date2 }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 20rem">
          <template #header>
            <div class="text-800 font-semibold">Bilim yurti nomi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>
        <Column style="min-width:300px; width:500px;">
          <template #header>
            <div class="text-800 font-semibold">Mutaxassisligi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.speciality }}
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:100px; width:150px;">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemUniversity($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteCadryUniversity($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>


    <!-- Foreign table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="cadryAbroadList.length==0">
      <add-button :title="'Xorijda ta\'lim olganligini qo\'shish'" @click="addItemAbroad()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!cadryAbroadList.length==0">
      <DataTable
        :value="cadryAbroadList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
              XORIJDA TA'LIM OLGANLAR
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItemAbroad()"
              />
            </div>
          </div>
        </template>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date1 }}
            </div>
          </template>
        </Column>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date2 }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 20rem">
          <template #header>
            <div class="text-800 font-semibold">Ta'lim muassasasi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.institute }}
            </div>
          </template>
        </Column>
        <Column style="min-width:100px; width:300px;">
          <template #header>
            <div class="text-800 font-semibold">Mutaxassisligi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.direction }}
            </div>
          </template>
        </Column>
        <Column style="min-width:100px; width:200px;">
          <template #header>
            <div class="text-800 font-semibold">Mablag'lashtirish</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.abroad_id.name }}
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:100px; width:150px;">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemAbroad($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteAbroad($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Academy table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="cadryAcademyList.length==0">
      <add-button :title="'Akademiyada ta\'lim olganligini qo\'shish'" @click="addItemAcademy()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!cadryAcademyList.length==0">
      <DataTable
        :value="cadryAcademyList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
              AKADEMIYADA TA'LIM OLGANLAR
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                @click="addItemAcademy()"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
              />
            </div>
          </div>
        </template>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date1 }}
            </div>
          </template>
        </Column>
        <Column style="min-width:100px; width:100px;">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.date2 }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 20rem">
          <template #header>
            <div class="text-800 font-semibold">Akademiya nomi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.academic_id.name }}
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:100px; width:150px;">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemAcademy($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteAcademy($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- University Dialog -->
    <div class="col-12">
      <Dialog
        v-model:visible="universityDialog"
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
              universityDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="v$.universityItemdate1.$model"
              :class="{
                'p-invalid': v$.universityItemdate1.$invalid && submitted,
              }"
              v-maska="'####'"
            />
          </div>
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="v$.universityItemdate2.$model"
              :class="{
                'p-invalid': v$.universityItemdate2.$invalid && submitted,
              }"
              v-maska="'####'"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Oligohni tanlang</h6>
            <Dropdown
              id="passportDistrict"
              v-model="selectUniversity"
      
              :options="UniversityList"
              optionLabel="name"
              :filter="true"
              placeholder="Oligohni tanlang"
              class="w-full font-semibold"
              @change="changeUniversityList"
            >
              <template #value="slotProps">
                <div
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Tamomlagan bilim yurti</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Bilim yurtini kiriting"
              id="employeePhone"
              v-model="v$.universityItemname.$model"
              :class="{
                'p-invalid': v$.universityItemname.$invalid && submitted,
              }"
              :autoResize="true"
              rows="5"
              cols="30"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Yo'nalishi</h6>
            <Textarea
              placeholder="Yo'nalishni kiriting"
              class="w-full font-semibold"
              id="employeePhone"
              v-model="v$.universityItemspeciality.$model"
              :class="{
                'p-invalid': v$.universityItemspeciality.$invalid && submitted,
              }"
              :autoResize="true"
              rows="5"
              cols="30"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="updateAndAddItems(v$)"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>

    <!-- Foreign Dialog -->
    <div class="col-12">
      <Dialog
        v-model:visible="abroadDialog"
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
              abroadDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="abroad_date1"
              v-maska="'####'"
            />
          </div>
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="abroad_date2"
              v-maska="'####'"
            />
          </div>
          
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Ta'lum muassasasi nomi</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Bilim yurtini kiriting"
              id="employeePhone"
              v-model="abroad_institute"
              :autoResize="true"
              rows="1"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Yo'nalishi</h6>
            <Textarea
              placeholder="Yo'nalishni kiriting"
              class="w-full font-semibold"
              id="employeePhone"
              v-model="abroad_direction"
              :autoResize="true"
              rows="1"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Mablag'lashtirish:</h6>
            <Dropdown
                id="academic"
                v-model="abroad_abroad_id"
                :options="abroadList"
                optionLabel="name"
                optionValue="id"
                placeholder="Tanlang"
                class="w-full font-semibold"
              />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditAbroad()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>

    <!-- Academy Dialog -->
    <div class="col-12">
      <Dialog
        v-model:visible="academyDialog"
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
              abroadDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="academydate1"
              v-maska="'####'"
            />
          </div>
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="employeePhone"
              v-model="academydate2"
              v-maska="'####'"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Akademiya nomi</h6>
            <Dropdown
                id="academic"
                v-model="academy_id"
                :options="AcademyList"
                optionLabel="name"
                optionValue="id"
                placeholder="Tanlang"
                class="w-full font-semibold"
              />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditAcademy()"
              />
            </div>
          </div>
        </template>
      </Dialog>
      <Toast position="bottom-right" />
    </div>
  </div>

</template>
<script>
import DeleteButton from "@/components/buttons/DeleteButton";
import { globalValidate } from "../../validation/vuevalidate";

import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import employeeService from "../../service/servises/employeeService";
import employeeAbroad from "../../service/servises/employeeAbroad";
import employeeAcademy from '../../service/servises/employeeAcademy'
import EditButton from "../buttons/EditButton.vue";
import ProgressBarLoader from "../loaders/ProgressBarLoader.vue";
import AddButton from '../buttons/AddButton.vue';

export default {
  components: {
    DeleteButton,
    EditButton,
    ProgressBarLoader,
    AddButton,
  },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      barLoader:false,

      academic: null,
      academicDegree: null,
      academicTitle: null,
      employeeNation: null,
      employeeLanguage: null,
      employeeParty: null,
      employeeMilitaryTitle: "",
      employeeSelectedOrgan: "",


      educationList: [],
      academikDegreeList: [],
      academikTitleList: [],
      nationalList: [],
      languagesList:[],
      partyList:[],

     
      cadryAbroadList:[],


      universityDialogType: true,
      universityDialog: false,
      universityList: [],
      UniversityList:[],
      universityId:null,
      selectUniversity:null,
      universityItemdate1: "",
      universityItemdate2: "",
      universityItemname: "",
      universityItemspeciality: "",

      academyDialogType:true,
      academyDialog:false,
      AcademyList: [],
      cadryAcademyList:[],
      academydate1:"",
      academydate2:"",
      academy_id:null,
      cadry_academy_id:null,

      submitted: false,
      
      abroadDialog:false,
      abroadDialogType:true,
      abroadList:[],
      abroad_date1:"",
      abroad_date2:"",
      abroad_institute:"",
      abroad_direction:"",
      abroad_abroad_id:null,
      abroad_id:null,

    };
  },

  validations() {
    return {
      academic: globalValidate.academic,
      academicDegree: globalValidate.academicDegree,
      academicTitle: globalValidate.academicTitle,
      employeeNation: globalValidate.employeeNation,
      employeeLanguage: globalValidate.employeeLanguage,
      employeeParty: globalValidate.employeeParty,
      employeeGender: globalValidate.employeeGender,
      employeePhone: globalValidate.employeePhone,
      employeeMilitaryTitle: globalValidate.employeeMilitaryTitle,
      employeeSelectedOrgan: globalValidate.employeeSelectedOrgan,
      universityItemdate1: globalValidate.universityItemdate1,
      universityItemdate2: globalValidate.universityItemdate2,
      universityItemname: globalValidate.universityItemname,
      universityItemspeciality: globalValidate.universityItemname,
    };
  },

  methods: {
    goPush() {
      this.$router.push("/admin/partemployee");
    },

  

    // Cadry university Action
    get_universityList(){
      employeeService.get_universityList().then((res)=>{
        this.UniversityList = res.data
      })
    },

    getCadryUniversity(id) {
      employeeService.get_CadryUniversity({ cadry_id: id }).then((res) => {
        this.universityList = res.data.infoeducations;
      });
    },

    updateCadryUniversity(id, data){
      employeeService.update_CadryUniversity({id, data }).then((res) => {
        this.getCadryUniversity(this.$route.params.id);
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tahrirlandi",
        life: 2000,
      });
        this.submitted = false;
      }).catch((error)=>{
        console.log(error);
      })
    },

    addingCadryUniversity(id, data){
      employeeService.adding_CadryUniversity({id, data }).then((res) => {
        this.getCadryUniversity(this.$route.params.id);
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Yaratildi",
        life: 2000,
      });
      });
    },

    deleteCadryUniversity(id){
      employeeService.delete_CadryUniversity({id }).then((res) => {
        this.getCadryUniversity(this.$route.params.id);
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "O'chirildi",
        life: 2000,
      });
      });
    },





   

    

    get_Info(){
      employeeService.get_Info().then((res)=>{
        console.log(res.data);
        this.educationList = res.data.educations;
        this.academikTitleList = res.data.academicTitlies;
        this.academikDegreeList = res.data.academicDegree;
        this.nationalList = res.data.nationalities;
        this.Party = res.data.parties;
        this.languagesList = res.data.languages;
      }).catch((error)=>{
        console.log(error);
      })
    },

    getCadry(id, loader) {
      this.controlLoader(loader)
      employeeService
        .get_CadryInfo({id})
        .then((res) => {
          this.academic = res.data.cadry.education_id.id;
          this.academicDegree = res.data.cadry.academicdegree_id.id
          this.academicTitle = res.data.cadry.academictitle_id.id
          this.employeeNation = res.data.cadry.nationality_id.id
          this.employeeLanguage = res.data.cadry.languages
          this.employeeMilitaryTitle = res.data.cadry.military_rank
          this.employeeSelectedOrgan = res.data.cadry.deputy;
          this.employeeParty = res.data.cadry.party_id.id  
          this.controlLoader(false) 
        })
        .catch((error) => {
          console.log(error);
          this.controlLoader(false) 
        });
    },

    update_Info(){
      let langIds = [];
      this.employeeLanguage.forEach((item)=>{
        langIds.push(item.id)
      })

      let data = {
        education_id: this.academic,
        academictitle_id:this.academicTitle,
        academicdegree_id: this.academicDegree,
        nationality_id:this.employeeNation,
        party_id: this.employeeParty,
        military_rank : this.employeeMilitaryTitle,
        deputy:this.employeeSelectedOrgan,
        language:langIds,


      }
      console.log(data);
      employeeService.update_Info({id:this.$route.params.id, data,}).then((res)=>{
        console.log(res.data);
        this.getCadry(this.$route.params.id, false);
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tahrirlandi",
        life: 2000,
      });
      }).catch((error)=>{
        console.log(error);
      })
      
    },



    // university event
    addItemUniversity() {
      this.universityItemdate1 = "";
      this.universityItemdate2 = "";
      this.universityItemname = "";
      this.universityItemspeciality = "";

      this.universityDialogType = true;
      this.controlUniversityDialog(true);
    },

    editItemUniversity(event) {
      console.log(event);
      this.universityId = event.id
      this.universityItemdate1 = event.date1;
      this.universityItemdate2 = event.date2;
      this.universityItemname = event.name;
      this.universityItemspeciality = event.speciality;

      this.universityDialogType = false;
      this.controlUniversityDialog(true);
    },

    updateAndAddItems(valid) {
      this.submitted = true;
      let data = {
          date1:this.universityItemdate1,
          date2: this.universityItemdate2,
          institut:  this.universityItemname,
          speciality: this.universityItemspeciality,
        };
      if(this.universityDialogType){
        this.controlUniversityDialog(false)
        this.addingCadryUniversity(this.$route.params.id, data)
      }else{ 
        this.controlUniversityDialog(false)
        this.updateCadryUniversity(this.universityId, data)
      }
      

      // this.updateCadryUniversity()
      console.log(valid);
    },
    changeUniversityList(event){
      this.universityItemname = event.value.name
    },

    get_CadryAbroad(id) {
      employeeAbroad.get_CadryAbroad({id}).then((res) => {
        console.log(res.data);
        this.cadryAbroadList = res.data;
      }).catch((error)=>{
        console.log(error);
      })
    },

    get_AbroadList(){
      employeeAbroad.get_AbroadList().then((res) => {
        console.log(res.data);
        this.abroadList = res.data;
      }).catch((error)=>{
        console.log(error);
      })
    },

    addItemAbroad(){
      this.abroadDialogType=true
      this.abroad_date1=""
      this.abroad_date2=""
      this.abroad_institute=""
      this.abroad_direction=""
      this.abroad_abroad_id=null
      this.controlAbroadDialog(true)
    },

    editItemAbroad(event){
      this.abroadDialogType=false
      this.abroad_date1=event.date1;
      this.abroad_date2=event.date2;
      this.abroad_institute=event.institute;
      this.abroad_direction=event.direction;
      this.abroad_abroad_id=event.abroad_id.id;
      this.abroad_id = event.id
      this.controlAbroadDialog(true)
    },

    addAndEditAbroad(){
      this.controlAbroadDialog(false)
      let data ={
        date1: this.abroad_date1,
        date2: this.abroad_date2,
        institute:this.abroad_institute,
        direction: this.abroad_direction,
        abroad_id: this.abroad_abroad_id
      }
      if(this.abroadDialogType){
        employeeAbroad.create_CadryAbroad({id:this.$route.params.id, data}).then((res) => {
          this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Qo'shildi",
        life: 2000,
      });
        this.get_CadryAbroad(this.$route.params.id)
       
      }).catch((error)=>{
        console.log(error);
      })
      }else{
        employeeAbroad.update_CadryAbroad({id:this.abroad_id, data}).then((res) => {
          this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tahrirlandi",
        life: 2000,
      });
        this.get_CadryAbroad(this.$route.params.id)
       
      }).catch((error)=>{
        console.log(error);
      })
      }



    },

    deleteAbroad(id){
      employeeAbroad.delete_CadryAbroad({id}).then((res) => {
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "O'chirildi",
        life: 2000,
      });
        this.get_CadryAbroad(this.$route.params.id)
       
      }).catch((error)=>{
        console.log(error);
      })
    },



    get_CadryAcademy(id) {
      employeeAcademy.get_CadryAcademy({id }).then((res) => {
        this.cadryAcademyList = res.data;
      });
    },

    get_AcademyList(){
      employeeAcademy.get_AcademyList().then((res) => {
        this.AcademyList = res.data;
      });
    },
    addItemAcademy(){
      this.academyDialogType = true
      this.academydate1 = ""
      this.academydate2 = ""
      this.academy_id = null
      this.controlAcademyDialog(true)

    },

    editItemAcademy(event){
      this.cadry_academy_id = event.id
      this.academyDialogType = false
      this.academydate1 = event.date1
      this.academydate2 = event.date2
      this.academy_id = event.academic_id.id
      this.controlAcademyDialog(true)
    },
    addAndEditAcademy(){
      this.controlAcademyDialog(false)
      let data ={
        date1:this.academydate1,
        date2:this.academydate2,
        academic_id:this.academy_id
      }
      if(this.academyDialogType){
        employeeAcademy.create_CadryAcademy({id:this.$route.params.id, data}).then((res)=>{
          this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Qo'shildi",
        life: 2000,
      });
          this.get_CadryAcademy(this.$route.params.id);
        }).catch((error)=>{
          console.log(error);
        })
      }else{
        employeeAcademy.update_CadryAcademy({id:this.cadry_academy_id, data}).then((res)=>{
          this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tahrirlandi",
        life: 2000,
      });
          this.get_CadryAcademy(this.$route.params.id);
        }).catch((error)=>{
          console.log(error);
        })
      }



    },

    deleteAcademy(id){
      employeeAcademy.delete_CadryAcademy({id}).then((res)=>{
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "O'chirildi",
        life: 2000,
      });
          this.get_CadryAcademy(this.$route.params.id);
        }).catch((error)=>{
          console.log(error);
        })
    },





    onImageRightClick(event) {
      this.$refs.menu.show(event);
    },

    
    controlUniversityDialog(item) {
      this.universityDialog = item;
    },

    // Foregn study

   
    controlAcademyDialog(item) {
      this.academyDialog = item;
    },
    controlAbroadDialog(item) {
      this.abroadDialog = item;
    },
    controlLoader(item){
      this.barLoader = item;
    },
  },
  created() {
    this.getCadryUniversity(this.$route.params.id);
    this.get_CadryAcademy(this.$route.params.id);
    this.get_CadryAbroad(this.$route.params.id)
    this.get_universityList()
    this.get_Info()
    this.get_AbroadList()
    this.get_AcademyList()

    this.getCadry(this.$route.params.id, true);
   
  },
};
</script>
<style lang="">
</style>