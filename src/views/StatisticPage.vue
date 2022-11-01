<template>
  <div class="grid">
    <!-- header search dropdown -->
    <div class="col-12">
      <div class="grid py-2 px-2 border-round-md">
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
                class="card all_cadry_card shadow-1 p-4 relative border-round-md"
              >
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="pi pi-eye text-2xl text-white cursor-pointer font-medium"
                  ></i>
                </div>

                <h2
                  class="text-center xl:text-6xl lg:text-3xl md:text-5xl sm:text-5xl text-6xl text-white font-bold mb-0"
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
                    class="pi pi-eye text-2xl text-white cursor-pointer font-medium"
                  ></i>
                </div>

                <h2
                  class="text-center xl:text-6xl lg:text-3xl md:text-5xl sm:text-5xl text-6xl text-white font-bold mb-0"
                >
                  {{ formatNumber(allVakant) }}
                </h2>
                <h6 class="text-center text-white mt-1">Vakansiya</h6>
              </div>
            </div>

            <!-- All sverx -->
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div class="all_sverx_card shadow-1 p-4 relative border-round-md">
                <div class="absolute" @click="statisticShow(145)">
                  <i
                    class="pi pi-eye text-2xl text-white cursor-pointer font-medium"
                  ></i>
                </div>

                <h2
                  class="text-center xl:text-6xl lg:text-3xl md:text-5xl sm:text-5xl text-6xl text-white font-bold mb-0"
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
                    class="pi pi-eye text-2xl text-white cursor-pointer font-medium"
                  ></i>
                </div>

                <h2
                  class="text-center xl:text-6xl lg:text-3xl md:text-5xl sm:text-5xl text-6xl text-white font-bold mb-0"
                >
                  {{ formatNumber(allPlan) }}
                </h2>
                <h6 class="text-center text-white mt-1">Shtat birligi</h6>
              </div>
            </div>

            <!-- All kasanachi -->
            <!-- <div class="col-12 sm:col-12 md:col-6 lg:col-2 xl:col-2">
              <div class="all_other_card shadow-1 p-4 relative border-round-md">
                <div class="absolute " @click="statisticShow(145)">
                  <i class="pi pi-eye text-2xl text-white cursor-pointer font-medium"></i>
                </div>
                <div class="w-full flex justify-content-center">
                  <img width="40" height="50" src="https://railway.uz/local/templates/main_v2/img/logo.webp" alt="">
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
                  {{ formatNumber(allContract) }}
                </h2>
                <h6 class="text-center text-white mt-1">Kasanachilar</h6>
              </div>
            </div> -->

            <!-- All notebook -->
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Erkak va Ayol</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Erkakalar -
                <span class="font-bold text-blue-500">{{
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
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Ayollar -
                <span class="font-bold text-green-500">{{
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
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Nafaqa yoshidagi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Erkakalar -
                <span class="font-bold text-blue-500">{{
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
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Ayollar -
                <span class="font-bold text-green-500">{{
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
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Kasanachi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Kasanachi -
                <span class="font-bold text-blue-500">{{ allContract }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Tibbiy ko'rik ma'lumotlari</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Muddati tugaganlar -
                <span class="font-bold text-yellow-500">{{
                  allCadries - medical_examinations
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="warning"
                :value="`${pensionsManChart}%`"
              ></Tag>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Kiritilmaganlar -
                <span class="font-bold text-red-500">{{
                  medical_examinations
                }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Ta'tildagi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Mehnat ta'tili -
                <span class="font-bold text-yellow-500">{{ vacations }}</span>
              </h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="warning"
                :value="`${vacationsChart}%`"
              ></Tag>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="uppercase my-2">
                Bola parvarish ta'tili -
                <span class="font-bold text-red-500">{{ vacations_Dec }}</span>
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
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Mehnat faoliyat</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Kirirtilmaganlar -
                <span class="font-bold text-blue-500">{{ allContract }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Qarindoshliligi</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Kirirtilmaganlar -
                <span class="font-bold text-blue-500">{{ allContract }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>

        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-blue-600 text-base uppercase font-semibold"
                >Bugungi tu'gilgan kunlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Xodimlar soni -
                <span class="font-bold text-blue-500">{{
                  allBirthdayCadries
                }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-green-500 text-base uppercase font-semibold"
                >Yangi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Xodimlar soni -
                <span class="font-bold text-blue-500">{{ allNewCadries }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-red-600 text-base uppercase font-semibold"
                >Faoliyati yakunlangan xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Xodimlar soni -
                <span class="font-bold text-blue-500">{{
                  allDeleteCadries
                }}</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
              ></Tag>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-3">
          <div class="grid card surface-0 shadow-1 px-2 pt-2 border-round-md">
            <div class="col-10">
              <span class="text-600 text-base uppercase font-semibold"
                >Qora ro'yxatdagi xodimlar</span
              >
            </div>
            <div class="col-2 flex justify-content-end">
              <i
                class="pi pi-eye text-lg text-blue-600 cursor-pointer font-medium"
              ></i>
            </div>
            <Divider class="mt-2 mb-1" />
            <div
              class="col-12 pb-0 flex justify-content-between align-items-start"
            >
              <h6 class="uppercase my-2">
                Xodimlar soni - <span class="font-bold text-blue-500">416</span>
              </h6>
            </div>
            <div
              class="col-12 pt-0 flex justify-content-between align-items-center"
            >
              <h6 class="my-2">Umumiy</h6>
              <Tag
                class="px-2 text-sm"
                rounded
                severity="danger"
                :value="`${pensionWomanChart}%`"
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

        <!-- Second section information -->
        <!-- <div class="col-12 md:col-6 lg:col-6 xl:col-12">
          <div class="card surface-0 shadow-1">
            <div class="card p-4 pb-6">
              <Divider align="center" type="dashed">
                <div class="font-medium text-500">Diagrammalar orqali</div>
              </Divider>
              <div class="grid">
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="allManChart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ allManCadries }}</h5>
                  <h6 class="text-center mt-0">Erkaklar soni</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="allWomanChart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ allWomanCadries }}</h5>
                  <h6 class="text-center mt-0">Ayollar soni</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="pensionsManChart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ pensionsMan }}</h5>
                  <h6 class="text-center mt-0">Nafaqa yoshidagi erkaklar</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="pensionWomanChart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ pensionWoman }}</h5>
                  <h6 class="text-center mt-0">Nafaqa yoshidagi ayollar</h6>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Third section information -->
        <!-- <div class="col-12 md:col-6 lg:col-6 xl:col-4">
          <div class="card surface-0 shadow-1">
            <div class="card p-4 pb-6">
              <Divider align="center" type="dashed">
                <div class="font-medium text-500">Diagrammalar orqali</div>
              </Divider>
              <div class="grid">
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="allCadry30Chart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ allCadry30 }}</h5>
                  <h6 class="text-center mt-0">30 yoshdan kichiklar</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="allCadry3045Chart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ allCadry3045 }}</h5>
                  <h6 class="text-center mt-0">30 - 45 yoshlilar</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="allCadry45Chart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ allCadry45 }}</h5>
                  <h6 class="text-center mt-0">45 yoshdan kattalar</h6>
                </div>
                <div class="col-12 xl:col-6">
                  <div class="flex justify-content-center">
                    <Knob
                      size="180"
                      v-model="alleducation_oliyChart"
                      valueTemplate="{value}%"
                      readonly
                      valueColor="MediumTurquoise"
                      rangeColor="SlateGray"
                      textColor="MediumTurquoise"
                    />
                  </div>
                  <h5 class="text-center my-0">{{ alleducation_oliy }}</h5>
                  <h6 class="text-center mt-0">Oliy ma'lumotlilar</h6>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- First section information -->
        <!-- <div class="col-12 md:col-12 lg:col-12 xl:col-4">
          <div class="card surface-0 shadow-1">
            <div class="card p-4 pb-0">
              <Divider align="center" type="dashed">
                <div class="font-medium text-blue-600">Bugun</div>
              </Divider>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-base
                    pl-1
                    hover:text-blue-500
                    cursor-pointer
                  "
                  @click="statisticShow(102)"
                >
                  Ishga qabul qilinganlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-green-500">{{ allNewCadries }}</span
                  >/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-base
                    pl-1
                    hover:text-blue-500
                    cursor-pointer
                  "
                  @click="statisticShow(102)"
                >
                  Faoliyati yakunlangan xodimlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-red-500">{{ allDeleteCadries }}</span
                  >/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-base
                    pl-1
                    hover:text-blue-500
                    cursor-pointer
                  "
                  @click="statisticShow(102)"
                >
                  Tug'ulgan kunlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">{{ allBirthdayCadries }}</span
                  >/{{ allCadries }}
                </div>
              </div>
            </div>

            <div class="card p-4 py-0">
              <Divider align="center" type="dashed">
                <div class="font-medium text-600">Umumiy</div>
              </Divider>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-700
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Tibbiy ko'rik (o'tganlar)
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-green-500">{{
                    allCadries - medical_examinations
                  }}</span
                  >/{{ allCadries }}
                </div>
              </div>

              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Tibbiy ko'rik (o'tmaganlar)
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-red-500">{{ medical_examinations }}</span
                  >/{{ allCadries }}
                </div>
              </div>

              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Mehnat ta'tilidagi xodimlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">{{ vacations }}</span
                  >/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Bola parvarishidagi xodimlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">{{ vacations_Dec }}</span
                  >/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Intizomiy jazolanganlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-red-500">00</span>/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Rag'batlantirilganlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">00</span>/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Ilmiy darajali xodimlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">00</span>/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Ilmiy unvonli xodimlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">00</span>/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Rag'batlantirilganlar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-yellow-500">00</span>/{{ allCadries }}
                </div>
              </div>
              <div
                class="
                  flex
                  justify-content-between
                  border-bottom-1 border-300
                  pb-2
                  mb-2
                "
              >
                <div
                  class="
                    font-semibold
                    text-600
                    hover:text-blue-500
                    cursor-pointer
                    text-base
                    pl-1
                  "
                  @click="statisticShow(102)"
                >
                  Qora ro'yhatdagilar
                </div>
                <div class="text-xl text-600 font-semibold pr-1">
                  <span class="text-red-500">{{ BlackList }}</span
                  >/{{ allCadries }}
                </div>
              </div>
            </div>
          </div>
        </div> -->
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
      medical_examinations: 0,
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

      selectedCountry: null,

      items: [
        {
          label: "Ko'rish",
          icon: "pi pi-eye",
        },
        {
          label: "Yopish",
          icon: "pi pi-eye-slash",
        },
      ],
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
  methods: {
    controlLoader(item) {
      this.loading = item;
    },

    get_Statistic(params) {
      this.controlLoader(true);
      // console.table(params);
      globalStatistic
        .get_globalStatistic(params)
        .then((res) => {
          console.log(res.data);
          this.allCadries = res.data.allCadriesCount;
          this.allVakant = res.data.vakant;
          this.allSverx = res.data.sverx;
          this.allPlan = res.data.plan;
          this.allContract = res.data.contracts;
          this.allIronNote = 0;
          this.allManCadries = res.data.all_man_cadries;
          this.allWomanCadries = res.data.all_woman_cadries;
          this.pensionWoman = res.data.pension_Woman;
          this.pensionsMan = res.data.pension_Man;
          this.allNewCadries = res.data.new_cadries;
          this.allDeleteCadries = res.data.delete_cadries;
          this.allBirthdayCadries = res.data.birthdays;
          this.allCadry30 = res.data.cadry30;
          this.allCadry3045 = res.data.cadry45 - res.data.cadry30;
          this.allCadry45 = res.data.all_cadries_count - res.data.cadry45;

          this.alleducation_oliy = res.data.education_oliy;
          this.multiAxisData.datasets[0].data[0] = res.data.education_oliy;
          this.multiAxisData.datasets[0].data[1] = res.data.education_maxsus;
          this.multiAxisData.datasets[0].data[2] = res.data.education_maxsus;
          this.medical_examinations = res.data.medical_examinations;

          this.vacations = res.data.vacations;
          this.vacations_Dec = res.data.vacations_Dec;

          this.vacationsChart = Math.floor(
            (res.data.vacations / res.data.all_cadries_count) * 100
          );

          this.vacations_DecChart = Math.floor(
            (res.data.vacations_Dec / res.data.allCadriesCount) * 100
          );

          this.BlackList = res.data.BlackList;

          this.allManChart = Math.floor(
            (res.data.all_man_cadries / res.data.allCadriesCount) * 100
          );
          this.allWomanChart = 100 - this.allManChart;
          this.pensionsManChart = Math.floor(
            (res.data.pension_Man / res.data.allCadriesCount) * 100
          );
          this.pensionWomanChart = Math.floor(
            (res.data.pension_Woman / res.data.allCadriesCount) * 100
          );
          this.allCadry30Chart = Math.floor(
            (res.data.cadry30 / res.data.allCadriesCount) * 100
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
      this.get_Statistic(this.organization);
      this.organization.department_id = null;
      this.departmentValue = null;
      this.get_Department(event.value.id);

      console.log(event.value.id);
    },

    changeDepartment(event) {
      this.organization.department_id = event.value.id;
      this.get_Statistic(this.organization);

      console.log(event.value.id);
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
    this.get_Statistic(this.organization);
    this.get_Railway();
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
