<template>
  <div>
    <div class="grid flex justify-content-center relative">
        <i @click="goBack()" class="pi pi-times-circle text-4xl text-red-600 absolute cordinate_btn cursor-pointer"></i>
      <div class="col-12 xl:col-10 lg:col-11 md:col-10 xl:mt-4 lg:mt-4 md:mt-4" v-show="!loader">
        <div
          class="
            grid
            shadow-1
            border-round-md
            mb-4
            p-4 xl:p-2 lg:p-2 md:p-2
          "
          :class="[isDark? 'custom_bg':'bg-primary-reverse']"
        >
          <div class="col-12 md:col-4 lg:col-3 xl:col-2 p-0">
            <img class="resume_picture" :src="cadry.phote" alt="" />
          </div>
          <div class="col-12 md:col-8 lg:col-5 xl:col-6 py-2">
            <h6 class="text-2xl text-800 my-2 uppercase font-bold">
              {{ cadry.fullName }}
            </h6>
            <h6 class="text-base text-800 my-3 font-semibold">
              {{ cadry.post_name }}
            </h6>
            <h6 class="text-base text-800 my-3 font-bold flex">
              <span class="pr-3">3.2</span>
              <Rating
                :modelValue="3"
                :readonly="true"
                :stars="5"
                :cancel="false"
              />
            </h6>

            <Button label="Yuklash" @click="DowloadResume($route.params.id)" class="p-button-raised p-button-info" />
          </div>

          <div class="col-12 py-4 pl-4 md:col-12 lg:col-4 xl:col-4">
            <h6 class="text-base text-900 my-2">
              <i class="pi pi-phone text-blue-500 font-bold pr-2 text-xl"></i>
              {{ cadry.phone }}
            </h6>
            <h6 class="text-base text-900 my-3">
              <i
                class="pi pi-calendar text-blue-500 font-bold pr-2 text-xl"
              ></i>
              {{ cadry.birth_date }}
            </h6>
            <h6 class="text-base text-900 my-2">
              <i
                class="pi pi-map-marker text-blue-500 font-bold pr-2 text-xl"
              ></i>
              {{ cadry.birth_place }}
            </h6>
            <h6 class="text-base text-900 my-3">
              <i
                class="pi pi-credit-card text-blue-500 font-bold pr-2 text-xl"
              ></i>
              {{ cadry.education }}
            </h6>

            <h6 class="text-base text-900 my-3">
              <i class="pi pi-globe text-blue-500 font-bold pr-2 text-xl"></i>
              {{ cadry.nationality }}
            </h6>
          </div>
        </div>

        <div class="grid">
          <div class="col-12 xl:col-4 pr-4">
            <div
            :class="[isDark? 'custom_bg':'bg-primary-reverse']"
              class="
                grid
                4
                shadow-1
                border-round-md

                mt-3
                bg-primary-reverse
                py-4
                px-4
              "
            >
              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 text-sm font-bold text-left">
                  <i
                    class="
                      pi pi-exclamation-circle
                      text-blue-500
                      font-bold
                      pr-2
                      text-xl
                    "
                  ></i>
                  Partiyaviyligi:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">{{ cadry.party }}</h6>
              </div>

              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 font-bold text-sm text-left">
                  <i
                    class="pi pi-id-card text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Mutaxassisligi:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">
                  {{ cadry.educations }}
                </h6>
              </div>

              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 font-bold text-left text-sm">
                  <i
                    class="
                      pi pi-credit-card
                      text-blue-500
                      font-bold
                      pr-2
                      text-xl
                    "
                  ></i>
                  Ilmiy darajasi:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">
                  {{ cadry.academec_degree }}
                </h6>
              </div>

              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 font-bold text-left text-sm">
                  <i
                    class="pi pi-bookmark text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Ilmiy unvoni:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">
                  {{ cadry.academec_title }}
                </h6>
              </div>

              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 font-bold text-left text-sm">
                  <i
                    class="pi pi-globe text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Chet tillari:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">{{ cadry.lan }}</h6>
              </div>

              <div class="col-6 py-2 flex align-items-center">
                <h6 class="text-900 font-bold text-sm text-left">
                  <i
                    class="pi pi-shield text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Xarbiy unvoni:
                </h6>
              </div>
              <div class="col-6 py-2">
                <h6 class="text-700 text-left text-sm">
                  {{ cadry.military_rank }}
                </h6>
              </div>

              <div class="col-6 py-0 flex align-items-center">
                <h6 class="text-900 font-bold text-sm text-left">
                  <i
                    class="pi pi-flag-fill text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Davlat mukofotlari:
                </h6>
              </div>
              <div class="col-6 py-2 pl-2">
                <h6 class="text-700 text-left text-sm">Yo'q</h6>
              </div>

              <div class="col-6 py-0 flex align-items-center">
                <h6 class="text-900 font-bold text-sm text-left">
                  <i
                    class="pi pi-user text-blue-500 font-bold pr-2 text-xl"
                  ></i>
                  Deputatliligi:
                </h6>
              </div>
              <div class="col-6 py-2 pl-2">
                <h6 class="text-700 text-left text-sm">{{ cadry.deputy }}</h6>
              </div>
            </div>
          </div>

          <div
          :class="[isDark? 'custom_bg':'bg-primary-reverse']"
            class="
                col-12
              xl:col-8
              shadow-1
              border-round-md
              mt-4
              bg-primary-reverse
              py-4
              px-2
              
            "
          >
            <div class="grid">
              <div class="col-12">
                <ScrollPanel style="width: 100%; height: 70px" class="custom">
                  <TabMenu
                    :model="items"
                    class="font-medium"
                    style="min-width: 950px"
                  />
                </ScrollPanel>
              </div>
              <div class="col-12 px-4 py-6" v-show="activeIndex == 0">
                <div
                  v-show="cadry.carers.length > 0"
                  class="grid"
                  v-for="career in cadry.carers"
                  :key="career.id"
                >
                  <div class="col-2">
                    <h6 class="text-center font-semibold text-600">
                      {{ career.date1 }}- {{ career.date2? career.date2 : 'h.gacha' }}
                    </h6>
                  </div>
                  <div class="col-10">
                    <h6 class="font-semibold text-600">
                      {{ career.staff_name }}
                    </h6>
                  </div>
                </div>
                <div class="grid" v-show="!cadry.carers.length > 0"></div>
              </div>
              <div class="col-12 px-4 py-6" v-show="activeIndex == 1">
                <div class="grid">
                  <div class="col-12" v-show="cadry.relatives.length > 0">
                    <div class="grid">
                      <div class="col-12 py-0 hidden xl:block lg:block">
                        <div class="grid">
                          <div class="col-2 relative_border">
                            <h6 class="font-semibold text-blue-600 my-0">
                              Qarindoshliligi
                            </h6>
                          </div>
                          <div class="col-2 relative_border">
                            <h6 class="font-semibold text-blue-600 my-0">
                              F.I.SH
                            </h6>
                          </div>
                          <div class="col-3 relative_border">
                            <h6 class="font-semibold text-blue-600 my-0">
                              Tug'ilgan yili va joyi
                            </h6>
                          </div>
                          <div class="col-3 relative_border">
                            <h6 class="font-semibold text-blue-600 my-0">
                              Ish joyi
                            </h6>
                          </div>
                          <div class="col-2 relative_border">
                            <h6 class="font-semibold text-blue-600 my-0">
                              Yashash manzili
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12"
                        v-for="relative in cadry.relatives"
                        :key="relative.id"
                      >
                        <div class="grid">
                          <div
                            class="
                              xl:col-2
                              lg:col-2
                              col-12
                              relative_border
                              flex
                              justify-content-center
                              align-items-center
                            "
                          >
                            <h6 class="font-semibold text-900 my-0">
                              {{ relative.relative.name }}
                            </h6>
                          </div>
                          <div
                            class="
                            xl:col-2
                              lg:col-2
                              col-12
                              relative_border
                              flex
                              justify-content-center
                              align-items-center
                            "
                          >
                            <h6 class="font-semibold text-900 my-0">
                              {{ relative.fullname }}
                            </h6>
                          </div>
                          <div
                            class="
                            xl:col-3
                              lg:col-3
                              col-12
                              relative_border
                              flex
                              justify-content-center
                              align-items-center
                            "
                          >
                            <h6 class="font-semibold text-900 my-0">
                              {{ relative.birth_place }}
                            </h6>
                          </div>
                          <div
                            class="
                            xl:col-3
                              lg:col-3
                              col-12
                              relative_border
                              flex
                              justify-content-center
                              align-items-center
                            "
                          >
                            <h6 class="font-semibold text-900 my-0">
                              {{ relative.post }}
                            </h6>
                          </div>
                          <div
                            class="
                            xl:col-2
                              lg:col-2
                              col-12
                              relative_border
                              flex
                              justify-content-center
                              align-items-center
                            "
                          >
                            <h6 class="font-semibold text-900 my-0">
                              {{ relative.address }}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12" v-show="cadry.relatives.length == 0">
                    <div class="text-center text-500">Ma'lumot yo'q</div>
                  </div>
                </div>
              </div>

              <div class="col-12 px-4 py-6" v-show="activeIndex == 2">
                <div class="grid" v-show="cadry.incentives.length > 0">
                  <div
                    class="col-12 lg:col-6 xl:col-6 p-2"
                    v-for="item in cadry.incentives"
                    :key="item.id"
                  >
                    <div class="card border-1 border-300 border-round-md p-3">
                      <h6 class="text-blue-500 my-1">
                        Kim tomonidan:
                        <span class="text-700 pl-2">{{ item.by_whom }}</span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Prikaz raqami:<span class="text-700 pl-2"
                          >{{ item.command_number }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Rag'bat turi:
                        <span class="text-700 pl-2">
                          {{ item.type_incentive }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Sababi:
                        <span class="text-700 pl-2">{{
                          item.reason_incentive
                        }}</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  v-show="!cadry.incentives.length > 0"
                  class="text-center text-500"
                >
                  Ma'lumot yo'q
                </div>
              </div>

              <div class="col-12 px-4 py-6" v-show="activeIndex == 3">
                <div class="grid" v-show="cadry.discips.length > 0">
                  <div
                    class="col-12 lg:col-6 xl:col-6 p-2"
                    v-for="item in cadry.discips"
                    :key="item.id"
                  >
                    <div class="card border-1 border-300 border-round-md p-3">
                      <h6 class="text-blue-500 my-1">
                        Prikaz raqami:<span class="text-700 pl-2"
                          >{{ item.command_number }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Jazo turi:
                        <span class="text-700 pl-2">
                          {{ item.type_punishment }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Sababi:
                        <span class="text-700 pl-2">{{
                          item.reason_punishment
                        }}</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  v-show="!cadry.discips.length > 0"
                  class="text-center text-500"
                >
                  Ma'lumot yo'q
                </div>
              </div>

              <div class="col-12 px-4 py-6" v-show="activeIndex == 4">
                <div class="grid" v-show="cadry.meds.length > 0">
                  <div
                    class="col-12 lg:col-6 xl:col-6 p-2"
                    v-for="item in cadry.meds"
                    :key="item.id"
                  >
                    <div class="card border-1 border-300 border-round-md p-3">
                      <h6 class="text-blue-500 my-1">
                        Qachondan:<span class="text-700 pl-2"
                          >{{ formatter.arrowDateFormat(item.date1) }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Qachondan:
                        <span class="text-700 pl-2">
                          {{ formatter.arrowDateFormat(item.date2) }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Status:
                        <span class="text-700 pl-2">{{ item.result }}</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  v-show="!cadry.meds.length > 0"
                  class="text-center text-500"
                >
                  Ma'lumot yo'q
                </div>
              </div>

              <div class="col-12 px-4 py-6" v-show="activeIndex == 5">
                <div class="grid" v-show="cadry.vacations.length > 0">
                  <div
                    class="col-12 lg:col-6 xl:col-6 p-2"
                    v-for="item in cadry.vacations"
                    :key="item.id"
                  >
                    <div class="card border-1 border-300 border-round-md p-3">
                      <h6 class="text-blue-500 my-1">
                        Qachondan:<span class="text-700 pl-2"
                          >{{ formatter.arrowDateFormat(item.date1) }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Qachongacha:
                        <span class="text-700 pl-2">
                          {{ formatter.arrowDateFormat(item.date2) }}
                        </span>
                      </h6>
                      <h6 class="text-blue-500 my-1">
                        Ta'til turi:
                        <span class="text-700 pl-2">{{
                          item.status_decret == 0
                            ? "Mehnat ta'tili"
                            : "Bola parvarish ta'tili"
                        }}</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  v-show="!cadry.vacations.length > 0"
                  class="text-center text-500"
                >
                  Ma'lumot yo'q
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12" v-show="loader">
        <progress-bar-loader></progress-bar-loader>
        <word-template v-show="false" ref="word_resumes"></word-template>
      </div>
      
    </div>
  </div>
</template>
  <script>
import EksportService from "../service/servises/EksportService";
import formatter from "../util/formatter";
import ProgressBarLoader from "../components/loaders/ProgressBarLoader.vue";
import WordTemplate from "../components/Eksport/WordTemplate.vue";
import { mapGetters  } from "vuex";
export default {
  components: {
    ProgressBarLoader,
    WordTemplate,
  },
  data() {
    return {
      loader: false,
      isDark:false,
      formatter,
      activeIndex: 0,
      visibleFull: false,
      cadry: {
        fullName: null,
        phote: null,
        phone: null,
        birth_place: null,
        birth_date: null,
        post_name: null,
        post_date: null,
        carers: [],
        relatives: [],
        educations: "",
        lan: null,
        academec_degree: null,
        academec_title: null,
        deputy: null,
        military_rank: null,
        incentives: [],
        discips: [],
        vacations: [],
        meds: [],
        nationality: null,
        party: null,
        education: null,
      },
      items: [
        {
          label: "Mehnat faoliyati",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 0;
          },
        },
        {
          label: "Yaqin qarindoshlari",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 1;
          },
        },
        {
          label: "Rag'batlantirish",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 2;
          },
        },
        {
          label: "Jazolar",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 3;
          },
        },
        {
          label: "Tibbiy ko'rik",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 4;
          },
        },
        {
          label: "Mehnat ta'tili",
          icon: "pi pi-user",
          command: (event) => {
            this.activeIndex = 5;
          },
        },
      ],
      active: 1,
    };
  },
  methods: {
    showResume(id) {
      this.controlLoader(true);
      EksportService.get_ResumeDetails({ id: id })
        .then((res) => {
          this.cadry.fullName = res.data.cadry.fullname;
          this.cadry.phote = res.data.cadry.photo;
          this.cadry.phone = res.data.cadry.phone;
          this.cadry.birth_place = res.data.cadry.birth_place;
          this.cadry.birth_date = res.data.cadry.birth_date;
          this.cadry.post_name = res.data.cadry.staff.staff_full;
          this.cadry.post_date = res.data.cadry.staff.staff_date;
          this.cadry.relatives = res.data.relatives;
          this.cadry.carers = res.data.carers;
          this.cadry.educations = res.data.educations
            .map((a) => a.speciality)
            .toString();
          this.cadry.lan = res.data.lan;
          this.cadry.academec_degree = res.data.cadry.academec_degree;
          this.cadry.academec_title = res.data.cadry.academec_title;
          this.cadry.deputy = res.data.cadry.deputy;
          this.cadry.military_rank = res.data.cadry.military_rank;
          this.cadry.incentives = res.data.incentives;
          this.cadry.discips = res.data.discips;
          this.cadry.nationality = res.data.cadry.nationality;
          this.cadry.party = res.data.cadry.party;
          this.cadry.education = res.data.cadry.education;
          this.cadry.vacations = res.data.vacations;
          this.cadry.meds = res.data.meds;

          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeTab(index) {
      this.activeIndex = index;
    },
    controlLoader(item) {
      this.loader = item;
    },
    DowloadResume(id) {
      console.table(id);
      this.$refs.word_resumes.generateWord(id);
    },
    goBack(){
       this.$router.push("/admin/partemployee") 
    }
  },
  computed:{
  ...mapGetters(["get_darkTheme"])
  },
  created() {
    this.isDark = this.get_darkTheme;
    this.showResume(this.$route.params.id);
  },
};
</script>
  <style lang="scss"  >
.resume_picture {
  width: 160px !important;
  max-width: 160px !important;
  min-height: 100% !important;
}
.custom_bg{
  background: #313a46 !important;
}
.cutom_mr {
  margin-right: 200px !important;
}
.cutom_pr {
  padding-right: 200px !important;
}
.custom_sidebar {
  background: #f1f1f1 !important;
  backdrop-filter: blur(4px) !important;
}
.border_bottom {
  border-bottom: 1px solid #5fbbfd !important;
}

.relative_border {
  border: 0px solid #e4e4e4 !important;
}
.custom .p-scrollpanel-wrapper {
  border-right: 0px solid #f4f4f4;
}

.custom .p-scrollpanel-bar {
  background-color: #1976d2;
  opacity: 1;
  transition: background-color 0.3s;
}

.custom .p-scrollpanel-bar:hover {
  background-color: #135ba1;
}

.cordinate_btn{
    top: 20px;
    right: 50px;
}
.cordinate_btn:active{
    transform: scale(0.9);
}
</style>