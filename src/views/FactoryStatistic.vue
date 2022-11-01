<template >
  <div class="grid">
    <!-- header search dropdown -->
    <div class="col-12">
      <div class="grid py-2 px-2 border-round-md" v-if="get_adminPermissions('cadry_leader_statistics')">
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
            disabled
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
              organizations.length
                ? organizations.length - 1
                : organizations.length
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
            Bo'limlar va bekatlar-
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
            @change="changeDepartment"
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
        <div class="col-12 md:col-6 lg:col-3 xl:col-3 flex">
          <div class="w-10">
            <Button
              icon="pi pi-search"
              label="Qidiruv"
              class="p-button-secondary w-full mt-5"
            />
          </div>
          <div class="w-2">
            <Button
              icon="pi pi-align-center"
              class="p-button-text w-full mt-5 p-button-sm p-button-secondary"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12" v-show="!loading">
      <div class="grid">
        <!-- Header statistic box -->
        <div class="col-12">
          <div class="grid">
            <!-- All users -->
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div
                class="
                  card
                  all_cadry_card
                  shadow-1
                  p-4
                  relative
                  border-round-md
                "
              >
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="
                      pi pi-eye
                      text-2xl text-white
                      cursor-pointer
                      font-medium
                    "
                  ></i>
                </div>

                <h2
                  class="
                    text-center
                    xl:text-6xl
                    lg:text-3xl
                    md:text-5xl
                    sm:text-5xl
                    text-6xl text-white
                    font-bold
                    mb-0
                  "
                >
                  {{ formatNumber(allCadries) }}
                </h2>
                <h6 class="text-center text-white mt-1">Barcha xodimlar</h6>
              </div>
            </div>

            <!-- All vakant -->
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div
                class="shadow-1 all_vakant_card p-4 relative border-round-md"
              >
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="
                      pi pi-eye
                      text-2xl text-white
                      cursor-pointer
                      font-medium
                    "
                  ></i>
                </div>

                <h2
                  class="
                    text-center
                    xl:text-6xl
                    lg:text-3xl
                    md:text-5xl
                    sm:text-5xl
                    text-6xl text-white
                    font-bold
                    mb-0
                  "
                >
                  {{ formatNumber(allVakant) }}
                </h2>
                <h6 class="text-center text-white mt-1">Bo'sh ish o'rinlari</h6>
              </div>
            </div>

            <!-- All sverx -->
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div class="all_sverx_card shadow-1 p-4 relative border-round-md">
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="
                      pi pi-eye
                      text-2xl text-white
                      cursor-pointer
                      font-medium
                    "
                  ></i>
                </div>

                <h2
                  class="
                    text-center
                    xl:text-6xl
                    lg:text-3xl
                    md:text-5xl
                    sm:text-5xl
                    text-6xl text-white
                    font-bold
                    mb-0
                  "
                >
                  {{ formatNumber(allSverx) }}
                </h2>
                <h6 class="text-center text-white mt-1">
                  Ortiqcha ish o'rinlari
                </h6>
              </div>
            </div>

            <!-- All position -->
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div class="all_other_card shadow-1 p-4 relative border-round-md">
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="
                      pi pi-eye
                      text-2xl text-white
                      cursor-pointer
                      font-medium
                    "
                  ></i>
                </div>

                <h2
                  class="
                    text-center
                    xl:text-6xl
                    lg:text-3xl
                    md:text-5xl
                    sm:text-5xl
                    text-6xl text-white
                    font-bold
                    mb-0
                  "
                >
                  {{ formatNumber(allPlan) }}
                </h2>
                <h6 class="text-center text-white mt-1">Shtat birligi</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Erkak va Ayol</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="
                col-12
                pb-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Erkakalar -
                <span class="font-bold text-lg text-blue-500">{{
                  this.allManCadries
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                :value="`${allManChart}%`"
              ></Tag>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Ayollar -
                <span class="font-bold text-lg text-green-500">{{
                  this.allWomanCadries
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="success"
                :value="`${allWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>


        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Nafaqa yoshidagi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="
                col-12
                pb-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase my-2 text-lg">
                Erkakalar -
                <span class="font-bold text-lg text-blue-500">{{
                  this.pensionsMan
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                :value="`${pensionsManChart}%`"
              ></Tag>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase my-2 text-lg">
                Ayollar -
                <span class="font-bold text-lg text-green-500">{{
                  this.pensionWoman
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="success"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 uppercase text-sm font-semibold"
                >Shartnomachi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Shartnomachi -
                <span class="font-bold text-lg text-blue-500">{{
                  allContract
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${allContractChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Tibbiy ko'rik ma'lumotlari</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="
                col-12
                pb-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Muddati tugaganlar -
                <span class="font-bold text-lg text-yellow-500">{{
                  meds
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="warning"
                :value="`${medsChart}%`"
              ></Tag>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Kiritilmaganlar -
                <span class="font-bold text-lg text-red-500">{{
                  mednotCount
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${mednotCountChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Ta'tildagi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="
                col-12
                pb-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Mehnat ta'tili -
                <span class="font-bold text-lg text-yellow-500">{{
                  vacations
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="warning"
                :value="`${vacationsChart}%`"
              ></Tag>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="uppercase text-lg my-2">
                Bola parvarish ta'tili -
                <span class="font-bold text-lg text-red-500">{{
                  vacations_Dec
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${vacations_DecChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Mehnat faoliyat</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Kirirtilmaganlar -
                <span class="font-bold text-lg text-blue-500">{{
                  careersCount
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${careersCountChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Qarindoshliligi</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Kirirtilmaganlar -
                <span class="font-bold text-lg text-blue-500">{{
                  relativesCount
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${relativesCountChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-sm uppercase font-semibold"
                >Bugungi tu'gilgan kunlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Xodimlar soni -
                <span class="font-bold text-lg text-blue-500">{{
                  allBirthdayCadries
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${allBirthdayCadriesChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-green-500 text-sm uppercase font-semibold"
                >Yangi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Xodimlar soni -
                <span class="font-bold text-lg text-blue-500">{{
                  allNewCadries
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${allNewCadriesChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-red-600 text-sm uppercase font-semibold"
                >Faoliyati yakunlanganlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Xodimlar soni -
                <span class="font-bold text-lg text-blue-500">{{
                  allDeleteCadries
                }}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${allDeleteCadriesChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-6 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-600 text-sm uppercase font-semibold"
                >Qora ro'yxatdagilar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="
                  pi pi-eye
                  text-lg text-blue-600
                  cursor-pointer
                  font-medium
                "
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase text-lg my-2">
                Xodimlar soni - <span class="font-bold text-blue-500">{{BlackList}}</span>
              </h6>
            </div>
            <div
              class="
                col-12
                pt-0
                flex
                justify-content-between
                align-items-center
              "
            >
              <h6 class="my-2 text-lg">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${BlackListChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 md:col-6 lg:col-6 xl:col-4">
          <div class="card surface-0 shadow-1 border-round-md px-2">
            <Chart
              type="bar"
              :data="multiAxisData"
              :options="multiAxisOptions"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-6 xl:col-4">
          <div class="card surface-0 shadow-1 border-round-md px-2">
            <Chart
              type="bar"
              :data="aducationForeign"
              :options="aducationForeignOption"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-6 xl:col-4">
          <div class="card surface-0 shadow-1 border-round-md px-2">
            <Chart
              type="bar"
              :data="govermentAcademy"
              :options="govermentAcademyOption"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-6 xl:col-4">
          <div class="card surface-0 shadow-1 border-round-md px-2">
            <Chart type="bar" :data="stackedData" :options="stackedOptions" />
          </div>
        </div>

        
     
      </div>
    </div>
    <div class="col-12" v-show="loading">
      <statistic-skeleton></statistic-skeleton>
    </div>
  </div>
</template>
<script>
import StatisticSkeleton from "../components/loaders/StatisticSkeleton.vue";
import organizationsService from "../service/servises/organizationsService";
import globalStatistic from "@/service/servises/globalStatistic";
import PartStatisticService from '../service/servises/PartStatisticService'
import { mapGetters } from 'vuex';
export default {
  components: { StatisticSkeleton },

  data() {
    return {
      loading: false,

      bigOrganizationList: [],
      bigOrgValue: null, //fake
      organizations: [],
      orgValue: null, //fake
      departmentList: [],
      departmentValue: null, //fake

      organization: {
        railway_id: null,
        organization_id: null,
        department_id: null,
      },

      allCadries: 0,
      allVakant: 0,
      allSverx: 0,
      allPlan: 0,
      allContract: 0,
      allIronNote: 0,

      allManCadries: 0,
      allWomanCadries: 0,
      pensionsMan: 0,
      pensionWoman: 0,

      allNewCadries: 0,
      allDeleteCadries: 0,
      allBirthdayCadries: 0,

      allCadry30: 0,
      allCadry3045: 0,
      allCadry45: 0,
      alleducation_oliy: 0,
      meds: 0,
      mednotCount: 0,
      vacations: 0,
      vacations_Dec: 0,
      vacationsChart: 0,
      vacations_DecChart: 0,
      BlackList: 0,

      // Chart Details
      allManChart: 0,
      allWomanChart: 0,
      pensionsManChart: 0,
      pensionWomanChart: 0,
      allCadry30Chart: 0,
      allCadry3045Chart: 0,
      allCadry45Chart: 0,
      alleducation_oliyChart: 0,
      allContractChart:0,
      medsChart:0,
      mednotCountChart:0,
      careersCountChart:0,
      relativesCountChart:0,
      allBirthdayCadriesChart:0,
      allNewCadriesChart:0,
      allDeleteCadriesChart:0,
      BlackListChart:0,




      selectedCountry: null,

      careersCount: 0,
      relativesCount: 0,

      
      multiAxisOptions: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Xodimlarni ma'lumotiga ko'ra ",
            color: "#42A5F5",
          },
          tooltip: {
            mode: "index",
            intersect: true,
          },
        },
        responsive: true,
      },
      multiAxisData: {
        labels: ["Oliy", "O'rta maxsus", "O'rta"],
        datasets: [
          {
            label: "Xodimlar soni",
            backgroundColor: ["#1c84ee", "#F59E0B", "#22C55E"],
            data: [13900, 27215, 39178],
          },
        ],
        borderWidth: 1,
      },

      aducationForeignOption: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Xorijda ta'lim olganlar",
            color: "#42A5F5",
          },
          tooltip: {
            mode: "index",
            intersect: true,
          },
        },
        responsive: true,
      },
      aducationForeign: {
        labels: [
          "Xorijda grant asosida",
          "Jamiyat mablag’i hisobidan o’qiganlar",
          "El-yurt  umid fondi stipendiyasi",
          "O’z hisobidan",
        ],
        datasets: [
          {
            label: "Xodimlar soni",
            backgroundColor: ["#1c84ee", "#F59E0B", "#22C55E"],
            data: [1, 2, 22, 12],
          },
        ],
        borderWidth: 1,
      },
      govermentAcademyOption: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Davlat akademiyasida ta'lim olganlar",
            color: "#42A5F5",
          },
          tooltip: {
            mode: "index",
            intersect: true,
          },
        },
        responsive: true,
      },
      govermentAcademy: {
        labels: [
          "Davlat akademiyasi (1 yillik)",
          "Davlat akademiyasi (2 yillik)",
          "Davlat akademiyasi (3 yillik)",
          "Boshqarma akademiyasi",
          "Biznes va tadbirlkorlik akademiyasi",
        ],
        datasets: [
          {
            label: "Xodimlar soni",
            backgroundColor: ["#1c84ee", "#F59E0B", "#22C55E"],
            data: [3, 2, 22, 12, 6],
          },
        ],
        borderWidth: 1,
      },

      stackedData: {
        labels: [
          "Yanvar",
          "Fevral",
          "Mart",
          "Aprel",
          "May",
          "Iyun",
          "Iyul",
          "Avgust",
          "Sentyabr",
          "Oktyabr",
          "Noyabr",
          "Dekabr",
        ],
        datasets: [
          {
            type: "bar",
            label: "Ishga olinganlar",
            backgroundColor: "#22C55E",
            data: [50, 25, 12, 48, 90, 76, 42, 24, 75, 37, 65, 34],
          },
          {
            type: "bar",
            label: "Mehnat faoliyati yakunlanganlar",
            backgroundColor: "#EF4444",
            data: [21, 84, 24, 75, 37, 65, 34, 24, 75, 37, 65, 34],
          },
        ],
      },
      stackedOptions: {
        plugins: {
          tooltip: {
            mode: "index",
            intersect: false,
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Xodimlarni ishga olish va bo'shatish oylar ko'rinishida",
            color: "#42A5F5",
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            stacked: true,
          },
        },
      },
    };
  },
  computed:{
    ...mapGetters(["get_adminPermissions",])
  },
  methods: {
    controlLoader(item) {
      this.loading = item;
    },

    get_Leader_Statistic(params) {
      this.controlLoader(true);
      // console.table(params);
      PartStatisticService
        .get_LeaderCadryStatistic(params)
        .then((res) => {
          console.log(res.data);
          this.allCadries = res.data.all_cadries_count;
          this.allVakant = res.data.vakant;
          this.allSverx = res.data.sverx;
          this.allPlan = res.data.plan;
          this.allContract = res.data.contract_cadries;
          this.allIronNote = 0;
          this.allManCadries = res.data.all_man_cadries;
          this.allWomanCadries = res.data.all_woman_cadries;
          this.pensionWoman = res.data.retired_WoMan;
          this.pensionsMan = res.data.retired_Man;
          this.allNewCadries = res.data.newcadries;
          this.allDeleteCadries = res.data.delete_cadries;
          this.allBirthdayCadries = res.data.birthdays;
          this.allCadry30 = res.data.cadry30;
          this.allCadry3045 = res.data.cadry45 - res.data.cadry30;
          this.allCadry45 = res.data.all_cadries_count - res.data.cadry45;
          this.careersCount = res.data.careersCount;
          this.relativesCount = res.data.relativesCount;

          careersCount: 0,
            // relativesCount:0,

            (this.alleducation_oliy = res.data.highly_special_educations);
          this.multiAxisData.datasets[0].data[0] =
            res.data.highly_special_educations;
          this.multiAxisData.datasets[0].data[1] =
            res.data.medium_special_cadries;
          this.multiAxisData.datasets[0].data[2] =
            res.data.secondary_special_cadries;

          this.aducationForeign.datasets[0].data[0] = res.data.abroads[0].count;
          this.aducationForeign.datasets[0].data[1] = res.data.abroads[1].count;
          this.aducationForeign.datasets[0].data[2] = res.data.abroads[2].count;
          this.aducationForeign.datasets[0].data[3] = res.data.abroads[3].count;

          this.govermentAcademy.datasets[0].data[0] =
            res.data.academics[0].count;
          this.govermentAcademy.datasets[0].data[1] =
            res.data.academics[1].count;
          this.govermentAcademy.datasets[0].data[2] =
            res.data.academics[2].count;
          this.govermentAcademy.datasets[0].data[3] =
            res.data.academics[3].count;
          this.govermentAcademy.datasets[0].data[4] =
            res.data.academics[4].count;

          this.stackedData.datasets[0].data[0] =
            res.data.new_caries_year[0].count;
          this.stackedData.datasets[0].data[1] =
            res.data.new_caries_year[1].count;
          this.stackedData.datasets[0].data[2] =
            res.data.new_caries_year[2].count;
          this.stackedData.datasets[0].data[3] =
            res.data.new_caries_year[3].count;
          this.stackedData.datasets[0].data[4] =
            res.data.new_caries_year[4].count;
          this.stackedData.datasets[0].data[5] =
            res.data.new_caries_year[5].count;
          this.stackedData.datasets[0].data[6] =
            res.data.new_caries_year[6].count;
          this.stackedData.datasets[0].data[7] =
            res.data.new_caries_year[7].count;
          this.stackedData.datasets[0].data[8] =
            res.data.new_caries_year[8].count;
          this.stackedData.datasets[0].data[9] =
            res.data.new_caries_year[9].count;
          this.stackedData.datasets[0].data[10] =
            res.data.new_caries_year[10].count;
          this.stackedData.datasets[0].data[11] =
            res.data.new_caries_year[11].count;

          this.stackedData.datasets[1].data[0] =
            res.data.delete_cadries_year[0].count;
          this.stackedData.datasets[1].data[1] =
            res.data.delete_cadries_year[1].count;
          this.stackedData.datasets[1].data[2] =
            res.data.delete_cadries_year[2].count;
          this.stackedData.datasets[1].data[3] =
            res.data.delete_cadries_year[3].count;
          this.stackedData.datasets[1].data[4] =
            res.data.delete_cadries_year[4].count;
          this.stackedData.datasets[1].data[5] =
            res.data.delete_cadries_year[5].count;
          this.stackedData.datasets[1].data[6] =
            res.data.delete_cadries_year[6].count;
          this.stackedData.datasets[1].data[7] =
            res.data.delete_cadries_year[7].count;
          this.stackedData.datasets[1].data[8] =
            res.data.delete_cadries_year[8].count;
          this.stackedData.datasets[1].data[9] =
            res.data.delete_cadries_year[9].count;
          this.stackedData.datasets[1].data[10] =
            res.data.delete_cadries_year[10].count;
          this.stackedData.datasets[1].data[11] =
            res.data.delete_cadries_year[11].count;

          this.meds = res.data.meds;
          this.mednotCount = res.data.mednotCount;

          this.medsChart = Math.floor(
            (res.data.meds / res.data.all_cadries_count) * 100
          );
          this.mednotCountChart = Math.floor(
            (res.data.mednotCount / res.data.all_cadries_count) * 100
          );

          this.careersCountChart = Math.floor(
            (res.data.careersCount / res.data.all_cadries_count) * 100
          );

          this.relativesCountChart = Math.floor(
            (res.data.relativesCount / res.data.all_cadries_count) * 100
          );

          this.allBirthdayCadriesChart = Math.floor(
            (res.data.birthdays / res.data.all_cadries_count) * 100
          );

          this.allNewCadriesChart = Math.floor(
            (res.data.newcadries / res.data.all_cadries_count) * 100
          );

          this.allDeleteCadriesChart = Math.floor(
            (res.data.delete_cadries / res.data.all_cadries_count) * 100
          );

          this.BlackListChart = Math.floor(
            (res.data.black_list_cadries / res.data.all_cadries_count) * 100
          );

          

          this.vacations = res.data.vacations;
          this.vacations_Dec = res.data.vacations_decret;

          this.vacationsChart = Math.floor(
            (res.data.vacations / res.data.all_cadries_count) * 100
          );

          this.vacations_DecChart = Math.floor(
            (res.data.vacations_decret / res.data.all_cadries_count) * 100
          );

          this.allContractChart = Math.floor(
            (res.data.contract_cadries / res.data.all_cadries_count) * 100
          );


          this.BlackList = res.data.black_list_cadries;

          this.allManChart = Math.floor(
            (res.data.all_man_cadries / res.data.all_cadries_count) * 100
          );
          this.allWomanChart = 100 - this.allManChart;
          this.pensionsManChart = Math.floor(
            (res.data.retired_Man / res.data.all_cadries_count) * 100
          );
          this.pensionWomanChart = Math.floor(
            (res.data.retired_WoMan / res.data.all_cadries_count) * 100
          );
          this.allCadry30Chart = Math.floor(
            (res.data.cadry30 / res.data.all_cadries_count) * 100
          );
          this.allCadry3045Chart = Math.floor(
            (this.allCadry3045 / res.data.all_cadries_count) * 100
          );
          this.allCadry45Chart = Math.floor(
            (res.data.cadry45 / res.data.all_cadries_count) * 100
          );
          this.alleducation_oliyChart = Math.floor(
            (res.data.education_oliy / res.data.all_cadries_count) * 100
          );

          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
          this.controlLoader(false);
        });
    },

    get_Statistic(params) {
      this.controlLoader(true);
      // console.table(params);
      PartStatisticService
        .get_PartStatistic(params)
        .then((res) => {
          console.log(res.data);
          this.allCadries = res.data.all_cadries_count;
          this.allVakant = res.data.vakant;
          this.allSverx = res.data.sverx;
          this.allPlan = res.data.plan;
          this.allContract = res.data.contract_cadries;
          this.allIronNote = 0;
          this.allManCadries = res.data.all_man_cadries;
          this.allWomanCadries = res.data.all_woman_cadries;
          this.pensionWoman = res.data.retired_Woman;
          this.pensionsMan = res.data.retired_Man;
          this.allNewCadries = res.data.newcadries;
          this.allDeleteCadries = res.data.delete_cadries;
          this.allBirthdayCadries = res.data.birthdays;
          this.allCadry30 = res.data.cadry30;
          this.allCadry3045 = res.data.cadry45 - res.data.cadry30;
          this.allCadry45 = res.data.all_cadries_count - res.data.cadry45;
          this.careersCount = res.data.careersCount;
          this.relativesCount = res.data.relativesCount;

          careersCount: 0,
            // relativesCount:0,

            (this.alleducation_oliy = res.data.highly_special_educations);
          this.multiAxisData.datasets[0].data[0] =
            res.data.highly_special_educations;
          this.multiAxisData.datasets[0].data[1] =
            res.data.medium_special_cadries;
          this.multiAxisData.datasets[0].data[2] =
            res.data.secondary_special_cadries;

          this.aducationForeign.datasets[0].data[0] = res.data.abroads[0].count;
          this.aducationForeign.datasets[0].data[1] = res.data.abroads[1].count;
          this.aducationForeign.datasets[0].data[2] = res.data.abroads[2].count;
          this.aducationForeign.datasets[0].data[3] = res.data.abroads[3].count;

          this.govermentAcademy.datasets[0].data[0] =
            res.data.academics[0].count;
          this.govermentAcademy.datasets[0].data[1] =
            res.data.academics[1].count;
          this.govermentAcademy.datasets[0].data[2] =
            res.data.academics[2].count;
          this.govermentAcademy.datasets[0].data[3] =
            res.data.academics[3].count;
          this.govermentAcademy.datasets[0].data[4] =
            res.data.academics[4].count;

          this.stackedData.datasets[0].data[0] =
            res.data.new_caries_year[0].count;
          this.stackedData.datasets[0].data[1] =
            res.data.new_caries_year[1].count;
          this.stackedData.datasets[0].data[2] =
            res.data.new_caries_year[2].count;
          this.stackedData.datasets[0].data[3] =
            res.data.new_caries_year[3].count;
          this.stackedData.datasets[0].data[4] =
            res.data.new_caries_year[4].count;
          this.stackedData.datasets[0].data[5] =
            res.data.new_caries_year[5].count;
          this.stackedData.datasets[0].data[6] =
            res.data.new_caries_year[6].count;
          this.stackedData.datasets[0].data[7] =
            res.data.new_caries_year[7].count;
          this.stackedData.datasets[0].data[8] =
            res.data.new_caries_year[8].count;
          this.stackedData.datasets[0].data[9] =
            res.data.new_caries_year[9].count;
          this.stackedData.datasets[0].data[10] =
            res.data.new_caries_year[10].count;
          this.stackedData.datasets[0].data[11] =
            res.data.new_caries_year[11].count;

          this.stackedData.datasets[1].data[0] =
            res.data.delete_cadries_year[0].count;
          this.stackedData.datasets[1].data[1] =
            res.data.delete_cadries_year[1].count;
          this.stackedData.datasets[1].data[2] =
            res.data.delete_cadries_year[2].count;
          this.stackedData.datasets[1].data[3] =
            res.data.delete_cadries_year[3].count;
          this.stackedData.datasets[1].data[4] =
            res.data.delete_cadries_year[4].count;
          this.stackedData.datasets[1].data[5] =
            res.data.delete_cadries_year[5].count;
          this.stackedData.datasets[1].data[6] =
            res.data.delete_cadries_year[6].count;
          this.stackedData.datasets[1].data[7] =
            res.data.delete_cadries_year[7].count;
          this.stackedData.datasets[1].data[8] =
            res.data.delete_cadries_year[8].count;
          this.stackedData.datasets[1].data[9] =
            res.data.delete_cadries_year[9].count;
          this.stackedData.datasets[1].data[10] =
            res.data.delete_cadries_year[10].count;
          this.stackedData.datasets[1].data[11] =
            res.data.delete_cadries_year[11].count;

          this.meds = res.data.meds;
          this.mednotCount = res.data.mednotCount;

          this.medsChart = Math.floor(
            (res.data.meds / res.data.all_cadries_count) * 100
          );
          this.mednotCountChart = Math.floor(
            (res.data.mednotCount / res.data.all_cadries_count) * 100
          );

          this.careersCountChart = Math.floor(
            (res.data.careersCount / res.data.all_cadries_count) * 100
          );

          this.relativesCountChart = Math.floor(
            (res.data.relativesCount / res.data.all_cadries_count) * 100
          );

          this.allBirthdayCadriesChart = Math.floor(
            (res.data.birthdays / res.data.all_cadries_count) * 100
          );

          this.allNewCadriesChart = Math.floor(
            (res.data.newcadries / res.data.all_cadries_count) * 100
          );

          this.allDeleteCadriesChart = Math.floor(
            (res.data.delete_cadries / res.data.all_cadries_count) * 100
          );

          this.BlackListChart = Math.floor(
            (res.data.black_list_cadries / res.data.all_cadries_count) * 100
          );

          

          this.vacations = res.data.vacations;
          this.vacations_Dec = res.data.vacations_decret;

          this.vacationsChart = Math.floor(
            (res.data.vacations / res.data.all_cadries_count) * 100
          );

          this.vacations_DecChart = Math.floor(
            (res.data.vacations_decret / res.data.all_cadries_count) * 100
          );

          this.allContractChart = Math.floor(
            (res.data.contract_cadries / res.data.all_cadries_count) * 100
          );


          this.BlackList = res.data.black_list_cadries;

          this.allManChart = Math.floor(
            (res.data.all_man_cadries / res.data.all_cadries_count) * 100
          );
          this.allWomanChart = 100 - this.allManChart;
          this.pensionsManChart = Math.floor(
            (res.data.retired_Man / res.data.all_cadries_count) * 100
          );
          this.pensionWomanChart = Math.floor(
            (res.data.retired_Woman / res.data.all_cadries_count) * 100
          );
          this.allCadry30Chart = Math.floor(
            (res.data.cadry30 / res.data.all_cadries_count) * 100
          );
          this.allCadry3045Chart = Math.floor(
            (this.allCadry3045 / res.data.all_cadries_count) * 100
          );
          this.allCadry45Chart = Math.floor(
            (res.data.cadry45 / res.data.all_cadries_count) * 100
          );
          this.alleducation_oliyChart = Math.floor(
            (res.data.education_oliy / res.data.all_cadries_count) * 100
          );


          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
          this.controlLoader(false);
        });
    },

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
          console.log(res.data);
          if (res.data.length) {
            this.departmentList = res.data;
            this.departmentList.unshift({
              name: "Barchasi",
              id: null,
            });
          } else {
            this.departmentList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changeRailway(event) {
      this.organization.railway_id = event.value.id;
      this.organization.department_id = null;
      this.organization.organization_id = null;
      this.get_Statistic(this.organization);
      this.get_Organization(event.value.id);
      this.orgValue = null;
      this.departmentValue = null;
      this.departmentList = [];
    },

    changeOrganization(event) {
      this.organization.organization_id = event.value.id;
      this.organization.department_id = null;
      this.get_Leader_Statistic(this.organization);
      this.departmentValue = null;
      this.get_Department(event.value.id);
    },

    changeDepartment(event) {
      this.organization.department_id = event.value.id;
      this.get_Leader_Statistic(this.organization);
    },

    checkStatistic() {
      let org = JSON.parse(localStorage.getItem("organization"));
     
      if (this.get_adminPermissions("cadry_leader_statistics")) {
        this.bigOrganizationList = [org.railway];
        this.bigOrgValue = org.railway
        this.organization.railway_id = org.railway.id;
        this.get_Leader_Statistic(this.organization);
        this.get_Organization(org.railway.id)
      } else {
        this.organization.railway_id = org.railway.id;
        this.organization.organization_id = org.id;
        this.get_Statistic(this.organization)
      }
    },

    formatNumber(item) {
      return item;
    },

    statisticShow(id) {
      console.log(id);
    },

    onImageRightClick(event) {
      this.$refs.menu.show(event);
    },
  },
  created() {
    this.controlLoader();
    this.checkStatistic()
  },
};
</script>
<style lang="scss">
.all_cadry_card {
  background-image: url("https://www.primefaces.org/avalon-vue/layout/images/dashboard/effect-1.svg");
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0dcaf0 !important;
}
.all_vakant_card {
  background-image: url("https://www.primefaces.org/avalon-vue/layout/images/dashboard/effect-3.svg");
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #6f42c1 !important;
}
.all_sverx_card {
  background-image: url("https://www.primefaces.org/avalon-vue/layout/images/dashboard/effect-2.svg");
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fd7e14 !important;
}

.all_other_card {
  background-image: url("https://www.primefaces.org/avalon-vue/layout/images/dashboard/effect-4.svg");
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #adb5bd !important;
}
</style>


